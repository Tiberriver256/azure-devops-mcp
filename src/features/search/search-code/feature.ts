import { WebApi } from 'azure-devops-node-api';
import axios from 'axios';
import { DefaultAzureCredential, AzureCliCredential } from '@azure/identity';
import {
  AzureDevOpsError,
  AzureDevOpsResourceNotFoundError,
  AzureDevOpsValidationError,
  AzureDevOpsPermissionError,
} from '../../../shared/errors';
import {
  SearchCodeOptions,
  CodeSearchRequest,
  CodeSearchResponse,
  CodeSearchResult,
} from '../types';

/**
 * Search for code in Azure DevOps repositories
 *
 * @param connection The Azure DevOps WebApi connection
 * @param options Parameters for searching code
 * @returns Search results with optional file content
 */
export async function searchCode(
  connection: WebApi,
  options: SearchCodeOptions,
): Promise<CodeSearchResponse> {
  try {
    // Prepare the search request
    const searchRequest: CodeSearchRequest = {
      searchText: options.searchText,
      $skip: options.skip,
      $top: options.top,
      filters: {
        Project: [options.projectId],
        ...options.filters,
      },
      includeFacets: true,
      includeSnippet: options.includeSnippet,
    };

    // Get the authorization header from the connection
    const authHeader = await getAuthorizationHeader();

    // Extract organization and project from the connection URL
    const { organization, project } = extractOrgAndProject(
      connection,
      options.projectId,
    );

    // Make the search API request
    const searchUrl = `https://almsearch.dev.azure.com/${organization}/${project}/_apis/search/codesearchresults?api-version=7.1`;
    const searchResponse = await axios.post<CodeSearchResponse>(
      searchUrl,
      searchRequest,
      {
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/json',
        },
      },
    );

    // Check if the response is valid
    if (!searchResponse.data) {
      throw new AzureDevOpsError('Search API returned an empty response');
    }

    const results = searchResponse.data;

    // Ensure results has required properties
    if (typeof results.count !== 'number') {
      results.count = 0;
    }

    // Ensure results.results is defined before accessing it
    if (!results.results) {
      results.results = [];
    }

    // If includeContent is true, fetch the content for each result
    if (options.includeContent && results.results.length > 0) {
      await enrichResultsWithContent(connection, results.results);
    }

    return results;
  } catch (error) {
    // If it's already an AzureDevOpsError, rethrow it
    if (error instanceof AzureDevOpsError) {
      throw error;
    }

    // Handle axios errors
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.message || error.message;

      if (status === 404) {
        throw new AzureDevOpsResourceNotFoundError(
          `Resource not found: ${message}`,
        );
      } else if (status === 400) {
        throw new AzureDevOpsValidationError(
          `Invalid request: ${message}`,
          error.response?.data,
        );
      } else if (status === 401 || status === 403) {
        throw new AzureDevOpsPermissionError(`Permission denied: ${message}`);
      } else {
        // For other axios errors, wrap in a generic AzureDevOpsError
        throw new AzureDevOpsError(`Azure DevOps API error: ${message}`);
      }
    }

    // Otherwise, wrap it in a generic error
    throw new AzureDevOpsError(
      `Failed to search code: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

/**
 * Extract organization and project from the connection URL
 *
 * @param connection The Azure DevOps WebApi connection
 * @param projectId The project ID or name
 * @returns The organization and project
 */
function extractOrgAndProject(
  connection: WebApi,
  projectId: string,
): { organization: string; project: string } {
  if (!connection || !connection.serverUrl) {
    throw new AzureDevOpsValidationError('Invalid connection object');
  }

  // Extract organization from the connection URL
  const url = connection.serverUrl;

  // Handle different Azure DevOps URL formats
  let organization = '';

  // Try dev.azure.com format
  const azureMatch = url.match(/https?:\/\/dev\.azure\.com\/([^/]+)/);
  if (azureMatch && azureMatch[1]) {
    organization = azureMatch[1];
  }

  // Try visualstudio.com format if dev.azure.com format didn't match
  if (!organization) {
    const vstsMatch = url.match(/https?:\/\/([^.]+)\.visualstudio\.com/);
    if (vstsMatch && vstsMatch[1]) {
      organization = vstsMatch[1];
    }
  }

  if (!organization) {
    throw new AzureDevOpsValidationError(
      `Could not extract organization from connection URL: ${url}`,
    );
  }

  if (!projectId) {
    throw new AzureDevOpsValidationError('Project ID is required');
  }

  return {
    organization,
    project: projectId,
  };
}

/**
 * Get the authorization header from the connection
 *
 * @returns The authorization header
 */
async function getAuthorizationHeader(): Promise<string> {
  try {
    // For PAT authentication, we can construct the header directly
    if (
      process.env.AZURE_DEVOPS_AUTH_METHOD?.toLowerCase() === 'pat' &&
      process.env.AZURE_DEVOPS_PAT
    ) {
      // For PAT auth, we can construct the Basic auth header directly
      const token = process.env.AZURE_DEVOPS_PAT;
      const base64Token = Buffer.from(`:${token}`).toString('base64');
      return `Basic ${base64Token}`;
    }

    // For Azure Identity / Azure CLI auth, we need to get a token
    // using the Azure DevOps resource ID
    // Choose the appropriate credential based on auth method
    const credential =
      process.env.AZURE_DEVOPS_AUTH_METHOD?.toLowerCase() === 'azure-cli'
        ? new AzureCliCredential()
        : new DefaultAzureCredential();

    // Azure DevOps resource ID for token acquisition
    const AZURE_DEVOPS_RESOURCE_ID = '499b84ac-1321-427f-aa17-267ca6975798';

    // Get token for Azure DevOps
    const token = await credential.getToken(
      `${AZURE_DEVOPS_RESOURCE_ID}/.default`,
    );

    if (!token || !token.token) {
      throw new Error('Failed to acquire token for Azure DevOps');
    }

    return `Bearer ${token.token}`;
  } catch (error) {
    throw new AzureDevOpsValidationError(
      `Failed to get authorization header: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

/**
 * Enrich search results with file content
 *
 * @param connection The Azure DevOps WebApi connection
 * @param results The search results to enrich
 */
async function enrichResultsWithContent(
  connection: WebApi,
  results: CodeSearchResult[],
): Promise<void> {
  // If results is undefined or empty, return early
  if (!results || results.length === 0) {
    return;
  }

  try {
    const gitApi = await connection.getGitApi();

    // Process each result in parallel
    await Promise.all(
      results.map(async (result) => {
        try {
          // Skip if the result doesn't have necessary properties
          if (!result.repository?.id || !result.path || !result.project?.name) {
            console.warn(
              'Skipping result with missing properties:',
              result.path || 'unknown path',
            );
            return;
          }

          // Check if versions exists and has items before accessing
          const changeId = result.versions?.[0]?.changeId;

          // Get the file content using the Git API
          const content = await gitApi.getItemContent(
            result.repository.id,
            result.path,
            result.project.name,
            changeId,
          );

          // Convert the buffer to a string and store it in the result
          if (content) {
            result.content = content.toString();
          }
        } catch (error) {
          // Log the error but don't fail the entire operation
          console.error(
            `Failed to fetch content for ${result.path}: ${error instanceof Error ? error.message : String(error)}`,
          );
        }
      }),
    );
  } catch (error) {
    // Log the error but don't fail the entire operation
    console.error(
      `Failed to enrich results with content: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

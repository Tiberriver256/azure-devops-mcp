import { WebApi } from 'azure-devops-node-api';
import { searchCode } from './feature';
import {
  getTestConnection,
  shouldSkipIntegrationTest,
} from '@/shared/test/test-helpers';
import { SearchCodeOptions } from '../types';

describe('searchCode integration', () => {
  let connection: WebApi | null = null;
  let projectName: string;

  beforeAll(async () => {
    // Get a real connection using environment variables
    connection = await getTestConnection();
    projectName = process.env.AZURE_DEVOPS_DEFAULT_PROJECT || 'DefaultProject';
  });

  test('should search code in a project', async () => {
    // Skip if no connection is available
    if (shouldSkipIntegrationTest()) {
      console.log('Skipping test: No Azure DevOps connection available');
      return;
    }

    // This connection must be available if we didn't skip
    if (!connection) {
      throw new Error(
        'Connection should be available when test is not skipped',
      );
    }

    const options: SearchCodeOptions = {
      searchText: 'class',
      projectId: projectName,
      top: 10,
    };

    // Act - make an actual API call to Azure DevOps
    const result = await searchCode(connection, options);

    // Assert on the actual response
    expect(result).toBeDefined();
    expect(typeof result.count).toBe('number');
    expect(Array.isArray(result.results)).toBe(true);

    // Check structure of returned items (if any)

    const firstResult = result.results[0];
    expect(firstResult.fileName).toBeDefined();
    expect(firstResult.path).toBeDefined();
    expect(firstResult.project).toBeDefined();
    expect(firstResult.repository).toBeDefined();

    if (firstResult.project) {
      expect(firstResult.project.name).toBe(projectName);
    }
  });

  test('should include file content when requested', async () => {
    // Skip if no connection is available
    if (shouldSkipIntegrationTest()) {
      console.log('Skipping test: No Azure DevOps connection available');
      return;
    }

    // This connection must be available if we didn't skip
    if (!connection) {
      throw new Error(
        'Connection should be available when test is not skipped',
      );
    }

    const options: SearchCodeOptions = {
      searchText: 'class',
      projectId: projectName,
      top: 5,
      includeContent: true,
    };

    // Act - make an actual API call to Azure DevOps
    const result = await searchCode(connection, options);

    // Assert on the actual response
    expect(result).toBeDefined();

    // At least some results should have content
    // Note: Some files might fail to fetch content, so we don't expect all to have it
    const hasContent = result.results.some((r) => r.content !== undefined);
    expect(hasContent).toBe(true);
  });

  test('should filter results when filters are provided', async () => {
    // Skip if no connection is available
    if (shouldSkipIntegrationTest()) {
      console.log('Skipping test: No Azure DevOps connection available');
      return;
    }

    // This connection must be available if we didn't skip
    if (!connection) {
      throw new Error(
        'Connection should be available when test is not skipped',
      );
    }

    // First get some results to find a repository name
    const initialOptions: SearchCodeOptions = {
      searchText: 'class',
      projectId: projectName,
      top: 1,
    };

    const initialResult = await searchCode(connection, initialOptions);

    // Use the repository from the first result for filtering
    const repoName = initialResult.results[0].repository.name;

    const filteredOptions: SearchCodeOptions = {
      searchText: 'class',
      projectId: projectName,
      filters: {
        Repository: [repoName],
      },
      top: 5,
    };

    // Act - make an actual API call to Azure DevOps with filters
    const result = await searchCode(connection, filteredOptions);

    // Assert on the actual response
    expect(result).toBeDefined();

    const allFromRepo = result.results.every(
      (r) => r.repository.name === repoName,
    );
    expect(allFromRepo).toBe(true);
  });

  test('should handle pagination', async () => {
    // Skip if no connection is available
    if (shouldSkipIntegrationTest()) {
      console.log('Skipping test: No Azure DevOps connection available');
      return;
    }

    // This connection must be available if we didn't skip
    if (!connection) {
      throw new Error(
        'Connection should be available when test is not skipped',
      );
    }

    // Get first page
    const firstPageOptions: SearchCodeOptions = {
      searchText: 'class',
      projectId: projectName,
      top: 2,
      skip: 0,
    };

    const firstPageResult = await searchCode(connection, firstPageOptions);

    // Get second page
    const secondPageOptions: SearchCodeOptions = {
      searchText: 'class',
      projectId: projectName,
      top: 2,
      skip: 2,
    };

    const secondPageResult = await searchCode(connection, secondPageOptions);

    // Assert on pagination
    expect(secondPageResult).toBeDefined();
    expect(secondPageResult.results.length).toBeGreaterThan(0);

    // First and second page should have different results

    const firstPagePaths = firstPageResult.results.map((r) => r.path);
    const secondPagePaths = secondPageResult.results.map((r) => r.path);

    // Check if there's any overlap between pages
    const hasOverlap = firstPagePaths.some((path) =>
      secondPagePaths.includes(path),
    );
    expect(hasOverlap).toBe(false);
  });
});

import axios from 'axios';
import { searchCode } from './feature';
import { WebApi } from 'azure-devops-node-api';
import { AzureDevOpsError } from '../../../shared/errors';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('searchCode unit', () => {
  // Mock WebApi connection
  const mockConnection = {
    getGitApi: jest.fn().mockImplementation(() => ({
      getItemContent: jest.fn().mockImplementation((_repoId, path) => {
        // Return different content based on the path to simulate different files
        if (path === '/src/example.ts') {
          return Buffer.from('export function example() { return "test"; }');
        }
        return Buffer.from('// Empty file');
      }),
    })),
    _getHttpClient: jest.fn().mockReturnValue({
      getAuthorizationHeader: jest.fn().mockReturnValue('Bearer mock-token'),
    }),
    getCoreApi: jest.fn().mockImplementation(() => ({
      getProjects: jest
        .fn()
        .mockResolvedValue([{ name: 'TestProject', id: 'project-id' }]),
    })),
    serverUrl: 'https://dev.azure.com/testorg',
  } as unknown as WebApi;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return search results with content', async () => {
    // Arrange
    const mockSearchResponse = {
      data: {
        count: 1,
        results: [
          {
            fileName: 'example.ts',
            path: '/src/example.ts',
            matches: {
              content: [
                {
                  charOffset: 17,
                  length: 7,
                },
              ],
            },
            collection: {
              name: 'DefaultCollection',
            },
            project: {
              name: 'TestProject',
              id: 'project-id',
            },
            repository: {
              name: 'TestRepo',
              id: 'repo-id',
              type: 'git',
            },
            versions: [
              {
                branchName: 'main',
                changeId: 'commit-hash',
              },
            ],
            contentId: 'content-hash',
          },
        ],
      },
    };

    mockedAxios.post.mockResolvedValueOnce(mockSearchResponse);

    // Act
    const result = await searchCode(mockConnection, {
      searchText: 'example',
      projectId: 'TestProject',
      includeContent: true,
    });

    // Assert
    expect(result).toBeDefined();
    expect(result.count).toBe(1);
    expect(result.results).toHaveLength(1);
    expect(result.results[0].fileName).toBe('example.ts');
    expect(result.results[0].content).toBe(
      'export function example() { return "test"; }',
    );
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.stringContaining(
        'https://almsearch.dev.azure.com/testorg/TestProject/_apis/search/codesearchresults',
      ),
      expect.objectContaining({
        searchText: 'example',
      }),
      expect.any(Object),
    );
  });

  test('should not fetch content when includeContent is false', async () => {
    // Arrange
    const mockSearchResponse = {
      data: {
        count: 1,
        results: [
          {
            fileName: 'example.ts',
            path: '/src/example.ts',
            matches: {
              content: [
                {
                  charOffset: 17,
                  length: 7,
                },
              ],
            },
            collection: {
              name: 'DefaultCollection',
            },
            project: {
              name: 'TestProject',
              id: 'project-id',
            },
            repository: {
              name: 'TestRepo',
              id: 'repo-id',
              type: 'git',
            },
            versions: [
              {
                branchName: 'main',
                changeId: 'commit-hash',
              },
            ],
            contentId: 'content-hash',
          },
        ],
      },
    };

    mockedAxios.post.mockResolvedValueOnce(mockSearchResponse);

    // Act
    const result = await searchCode(mockConnection, {
      searchText: 'example',
      projectId: 'TestProject',
      includeContent: false,
    });

    // Assert
    expect(result).toBeDefined();
    expect(result.count).toBe(1);
    expect(result.results).toHaveLength(1);
    expect(result.results[0].fileName).toBe('example.ts');
    expect(result.results[0].content).toBeUndefined();
    expect(mockConnection.getGitApi).not.toHaveBeenCalled();
  });

  test('should handle empty search results', async () => {
    // Arrange
    const mockSearchResponse = {
      data: {
        count: 0,
        results: [],
      },
    };

    mockedAxios.post.mockResolvedValueOnce(mockSearchResponse);

    // Act
    const result = await searchCode(mockConnection, {
      searchText: 'nonexistent',
      projectId: 'TestProject',
    });

    // Assert
    expect(result).toBeDefined();
    expect(result.count).toBe(0);
    expect(result.results).toHaveLength(0);
  });

  test('should handle API errors', async () => {
    // Arrange
    const axiosError = new Error('API Error');
    (axiosError as any).isAxiosError = true;
    (axiosError as any).response = {
      status: 404,
      data: {
        message: 'Project not found',
      },
    };

    mockedAxios.post.mockRejectedValueOnce(axiosError);

    // Act & Assert
    await expect(
      searchCode(mockConnection, {
        searchText: 'example',
        projectId: 'NonExistentProject',
      }),
    ).rejects.toThrow(AzureDevOpsError);
  });

  test('should propagate custom errors when thrown internally', async () => {
    // Arrange
    const customError = new AzureDevOpsError('Custom error');

    // Mock axios to properly return the custom error
    mockedAxios.post.mockImplementationOnce(() => {
      throw customError;
    });

    // Act & Assert
    await expect(
      searchCode(mockConnection, {
        searchText: 'example',
        projectId: 'TestProject',
      }),
    ).rejects.toThrow(AzureDevOpsError);

    // Reset mock and set it up again for the second test
    mockedAxios.post.mockReset();
    mockedAxios.post.mockImplementationOnce(() => {
      throw customError;
    });

    await expect(
      searchCode(mockConnection, {
        searchText: 'example',
        projectId: 'TestProject',
      }),
    ).rejects.toThrow('Custom error');
  });

  test('should apply filters when provided', async () => {
    // Arrange
    const mockSearchResponse = {
      data: {
        count: 1,
        results: [
          {
            fileName: 'example.ts',
            path: '/src/example.ts',
            matches: {
              content: [
                {
                  charOffset: 17,
                  length: 7,
                },
              ],
            },
            collection: {
              name: 'DefaultCollection',
            },
            project: {
              name: 'TestProject',
              id: 'project-id',
            },
            repository: {
              name: 'TestRepo',
              id: 'repo-id',
              type: 'git',
            },
            versions: [
              {
                branchName: 'main',
                changeId: 'commit-hash',
              },
            ],
            contentId: 'content-hash',
          },
        ],
      },
    };

    mockedAxios.post.mockResolvedValueOnce(mockSearchResponse);

    // Act
    await searchCode(mockConnection, {
      searchText: 'example',
      projectId: 'TestProject',
      filters: {
        Repository: ['TestRepo'],
        Path: ['/src'],
        Branch: ['main'],
        CodeElement: ['function'],
      },
    });

    // Assert
    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        filters: {
          Project: ['TestProject'],
          Repository: ['TestRepo'],
          Path: ['/src'],
          Branch: ['main'],
          CodeElement: ['function'],
        },
      }),
      expect.any(Object),
    );
  });

  test('should handle pagination parameters', async () => {
    // Arrange
    const mockSearchResponse = {
      data: {
        count: 100,
        results: Array(10)
          .fill(0)
          .map((_, i) => ({
            fileName: `example${i}.ts`,
            path: `/src/example${i}.ts`,
            matches: {
              content: [
                {
                  charOffset: 17,
                  length: 7,
                },
              ],
            },
            collection: {
              name: 'DefaultCollection',
            },
            project: {
              name: 'TestProject',
              id: 'project-id',
            },
            repository: {
              name: 'TestRepo',
              id: 'repo-id',
              type: 'git',
            },
            versions: [
              {
                branchName: 'main',
                changeId: 'commit-hash',
              },
            ],
            contentId: `content-hash-${i}`,
          })),
      },
    };

    mockedAxios.post.mockResolvedValueOnce(mockSearchResponse);

    // Act
    await searchCode(mockConnection, {
      searchText: 'example',
      projectId: 'TestProject',
      top: 10,
      skip: 20,
    });

    // Assert
    expect(mockedAxios.post).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        $top: 10,
        $skip: 20,
      }),
      expect.any(Object),
    );
  });

  test('should handle errors when fetching file content', async () => {
    // Arrange
    const mockSearchResponse = {
      data: {
        count: 1,
        results: [
          {
            fileName: 'example.ts',
            path: '/src/example.ts',
            matches: {
              content: [
                {
                  charOffset: 17,
                  length: 7,
                },
              ],
            },
            collection: {
              name: 'DefaultCollection',
            },
            project: {
              name: 'TestProject',
              id: 'project-id',
            },
            repository: {
              name: 'TestRepo',
              id: 'repo-id',
              type: 'git',
            },
            versions: [
              {
                branchName: 'main',
                changeId: 'commit-hash',
              },
            ],
            contentId: 'content-hash',
          },
        ],
      },
    };

    mockedAxios.post.mockResolvedValueOnce(mockSearchResponse);

    // Mock Git API to throw an error
    const mockGitApi = {
      getItemContent: jest
        .fn()
        .mockRejectedValue(new Error('Failed to fetch content')),
    };
    const mockConnectionWithError = {
      ...mockConnection,
      getGitApi: jest.fn().mockResolvedValue(mockGitApi),
    } as unknown as WebApi;

    // Act
    const result = await searchCode(mockConnectionWithError, {
      searchText: 'example',
      projectId: 'TestProject',
      includeContent: true,
    });

    // Assert
    expect(result).toBeDefined();
    expect(result.count).toBe(1);
    expect(result.results).toHaveLength(1);
    // Content should be undefined when there's an error fetching it
    expect(result.results[0].content).toBeUndefined();
  });
});

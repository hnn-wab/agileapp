// Issue一覧取得（ページネーション対応）APIラッパー関数例
// GitHubApiClientクラスのgetIssuesメソッドをページネーション対応で拡張

import { GitHubApiClient } from './githubApiClient';
import type { AuthProvider } from './authProvider';
import type { Issue } from '../types/app';
import { handleApiError } from '../utils/errorHandler';

export async function fetchIssuesPaginated(
  authProvider: AuthProvider,
  owner: string,
  repo: string,
  page: number = 1,
  perPage: number = 30
): Promise<Issue[] | null> {
  const client = new GitHubApiClient(authProvider);
  try {
    return await client.getIssuesPaginated(owner, repo, page, perPage);
  } catch (error) {
    return null;
  }
}

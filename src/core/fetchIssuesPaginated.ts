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
    // OctokitのlistForRepoはページネーション対応
    const res = await client['octokit'].issues.listForRepo({
      owner,
      repo,
      page,
      per_page: perPage,
    });
    return res.data.map(issue => ({
      id: issue.id,
      title: issue.title,
      state: issue.state as 'open' | 'closed',
      labels: issue.labels.map(l => typeof l === 'string' ? l : l.name ?? ''),
      milestone: issue.milestone?.title,
      createdAt: issue.created_at,
      closedAt: issue.closed_at ?? undefined,
      storyPoint: undefined,
    }));
  } catch (error) {
    const err = handleApiError(error);
    console.error('Issue一覧取得エラー:', err);
    return null;
  }
}

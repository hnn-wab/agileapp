import { GitHubApiClient } from '../../packages/core/core/githubApiClient';
import type { AuthProvider } from '../../packages/core/core/authProvider';
import { GitHubLabel } from '../../packages/core/types/github';

/**
 * 指定リポジトリのLabel一覧を取得するラッパー関数（全件取得・業界標準）
 */
export async function fetchLabels(
  authProvider: AuthProvider,
  owner: string,
  repo: string
): Promise<GitHubLabel[] | null> {
  const client = new GitHubApiClient(authProvider);
  try {
    return await client.getAllLabels(owner, repo);
  } catch {
    return null;
  }
}
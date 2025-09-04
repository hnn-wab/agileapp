// リポジトリ情報取得のAPIラッパー関数例
// GitHubApiClientクラスのgetRepositoryメソッドを利用

import { GitHubApiClient } from './githubApiClient';
import type { AuthProvider } from './authProvider';
import type { Repository } from '../types/app';
import { handleApiError } from '../utils/errorHandler';

export async function fetchRepositoryInfo(
  authProvider: AuthProvider,
  owner: string,
  repo: string
): Promise<Repository | null> {
  const client = new GitHubApiClient(authProvider);
  try {
    return await client.getRepository(owner, repo);
  } catch (error) {
    const err = handleApiError(error);
    // 必要に応じてUI通知やログ出力
    console.error('リポジトリ情報取得エラー:', err);
    return null;
  }
}

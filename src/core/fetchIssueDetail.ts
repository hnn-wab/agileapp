import { Octokit } from '@octokit/rest';
import { GitHubIssue } from '../types/github';
import { ErrorType } from '../types/error';
import { handleApiError } from '../utils/errorHandler';

/**
 * 指定リポジトリのIssue詳細を取得するラッパー関数
 * @param octokit Octokitインスタンス
 * @param owner リポジトリ所有者
 * @param repo リポジトリ名
 * @param issue_number Issue番号
 * @returns Issue詳細データ or ErrorType
 */
export async function fetchIssueDetail(
  octokit: Octokit,
  owner: string,
  repo: string,
  issue_number: number
): Promise<GitHubIssue | ErrorType> {
  try {
    const response = await octokit.issues.get({
      owner,
      repo,
      issue_number,
    });
  // 型変換せずAPIレスポンスをそのまま返す
  return response.data as GitHubIssue;
  } catch (error) {
    return handleApiError(error);
  }
}

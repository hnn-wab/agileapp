import { Octokit } from '@octokit/rest';
<<<<<<< HEAD
import { GitHubIssue } from '../types/github';
=======
import { Issue } from '../types/github';
>>>>>>> 51e55cef (add scripts section to package.json and setup for Next.js dev server)
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
<<<<<<< HEAD
): Promise<GitHubIssue | ErrorType> {
=======
): Promise<Issue | ErrorType> {
>>>>>>> 51e55cef (add scripts section to package.json and setup for Next.js dev server)
  try {
    const response = await octokit.issues.get({
      owner,
      repo,
      issue_number,
    });
<<<<<<< HEAD
  // 型変換せずAPIレスポンスをそのまま返す
  return response.data as GitHubIssue;
=======
    // 必要に応じて内部モデルへ変換
    const issue: Issue = {
      id: response.data.id,
      number: response.data.number,
      title: response.data.title,
      state: response.data.state,
      body: response.data.body ?? undefined,
      labels: response.data.labels,
  assignees: response.data.assignees ?? [],
      milestone: response.data.milestone
        ? {
            ...response.data.milestone,
            description:
              response.data.milestone.description === null
                ? undefined
                : response.data.milestone.description,
            due_on:
              response.data.milestone.due_on === null
                ? undefined
                : response.data.milestone.due_on,
            closed_at:
              response.data.milestone.closed_at === null
                ? undefined
                : response.data.milestone.closed_at,
          }
        : undefined,
      created_at: response.data.created_at,
      updated_at: response.data.updated_at,
      closed_at: response.data.closed_at ?? undefined,
      user: response.data.user,
      comments: response.data.comments,
      // 必要に応じて他フィールド追加
    };
    return issue;
>>>>>>> 51e55cef (add scripts section to package.json and setup for Next.js dev server)
  } catch (error) {
    return handleApiError(error);
  }
}
<<<<<<< HEAD
=======
// ...existing code...
>>>>>>> 51e55cef (add scripts section to package.json and setup for Next.js dev server)

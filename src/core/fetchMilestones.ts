import { Octokit } from '@octokit/rest';
import { Milestone } from '../types/github';
import { ErrorType } from '../types/error';
import { handleApiError } from '../utils/errorHandler';

/**
 * 指定リポジトリのMilestone一覧を取得するラッパー関数
 * @param octokit Octokitインスタンス
 * @param owner リポジトリ所有者
 * @param repo リポジトリ名
 * @returns Milestone配列 or ErrorType
 */
export async function fetchMilestones(
  octokit: Octokit,
  owner: string,
  repo: string
): Promise<Milestone[] | ErrorType> {
  try {
    const response = await octokit.issues.listMilestones({
      owner,
      repo,
      state: 'all', // open/closed/all
      per_page: 100, // 必要に応じてページネーション対応
    });
    // 必要に応じて内部モデルへ変換
    const milestones: Milestone[] = response.data.map((m) => ({
      id: m.id,
      number: m.number,
      title: m.title,
      description: m.description === null ? undefined : m.description,
      state: m.state,
      open_issues: m.open_issues,
      closed_issues: m.closed_issues,
      created_at: m.created_at,
      updated_at: m.updated_at,
      due_on: m.due_on === null ? undefined : m.due_on,
      closed_at: m.closed_at === null ? undefined : m.closed_at,
      // 必要に応じて他フィールド追加
    }));
    return milestones;
  } catch (error) {
    return handleApiError(error);
  }
}
// ...existing code...
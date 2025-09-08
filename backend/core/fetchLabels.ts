import { Octokit } from '@octokit/rest';
import { Label } from '../types/github';
import { ErrorType } from '../types/error';
// importパスは必要に応じて修正
import { handleApiError } from '../utils/errorHandler';

/**
 * 指定リポジトリのLabel一覧を取得するラッパー関数
 * @param octokit Octokitインスタンス
 * @param owner リポジトリ所有者
 * @param repo リポジトリ名
 * @returns Label配列 or ErrorType
 */
export async function fetchLabels(
	octokit: Octokit,
	owner: string,
	repo: string
): Promise<Label[] | ErrorType> {
	try {
		const response = await octokit.issues.listLabelsForRepo({
			owner,
			repo,
			per_page: 100, // 必要に応じてページネーション対応
		});
		// 必要に応じて内部モデルへ変換
		const labels: Label[] = response.data.map((l) => ({
			id: l.id,
			name: l.name,
			color: l.color,
			description: l.description ?? undefined,
			default: l.default,
			// 必要に応じて他フィールド追加
		}));
		return labels;
	} catch (error) {
		return handleApiError(error);
	}
}

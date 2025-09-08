import { Issue } from '../types/app';

/**
 * ベロシティ（完了Issue数 or ストーリーポイント合計）を計算
 * @param issues Issue配列
 * @param from 開始日（YYYY-MM-DD）
 * @param to 終了日（YYYY-MM-DD）
 * @param mode 'count' | 'point'
 * @returns ベロシティ値
 */
export function calcVelocity(
  issues: Issue[],
  from: string,
  to: string,
  mode: 'count' | 'point' = 'count'
): number {
  const fromDate = new Date(from);
  const toDate = new Date(to);
  const closedIssues = issues.filter(i => {
    if (!i.closedAt) return false;
    const closed = new Date(i.closedAt);
    return closed >= fromDate && closed <= toDate;
  });
  if (mode === 'count') {
    return closedIssues.length;
  } else {
    return closedIssues.reduce((sum, i) => sum + (i.storyPoint || 0), 0);
  }
}
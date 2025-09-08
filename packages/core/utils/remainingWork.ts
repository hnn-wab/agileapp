import { Issue } from '../types/app';

export interface RemainingWorkPoint {
  date: string;
  value: number;
}

/**
 * 残作業量（Issue数/ストーリーポイント）を計算する
 * @param issues Issue配列
 * @param from 開始日（YYYY-MM-DD）
 * @param to 終了日（YYYY-MM-DD）
 * @param mode 'count' | 'point'
 * @returns 日付ごとの残作業量
 */
export function calcRemainingWork(
  issues: Issue[],
  from: string,
  to: string,
  mode: 'count' | 'point' = 'count'
): RemainingWorkPoint[] {
  const result: RemainingWorkPoint[] = [];
  const fromDate = new Date(from);
  const toDate = new Date(to);
  for (let d = new Date(fromDate); d <= toDate; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().slice(0, 10);
    const openIssues = issues.filter(i => {
      const created = new Date(i.createdAt).getTime();
      const closed = i.closedAt ? new Date(i.closedAt).getTime() : Infinity;
      const current = new Date(dateStr).getTime();
      return created <= current && closed > current;
    });
    const value = mode === 'count'
      ? openIssues.length
      : openIssues.reduce((sum, i) => sum + (i.storyPoint || 0), 0);
    result.push({ date: dateStr, value });
  }
  return result;
}
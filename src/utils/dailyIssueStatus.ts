import { Issue } from '../types/app';

export interface DailyIssueStatus {
  date: string;
  open: number;
  closed: number;
}

/**
 * 指定した日付範囲で日別のopen/closed件数を計算
 */
export function calcDailyIssueStatus(
  issues: Issue[],
  from: string,
  to: string
): DailyIssueStatus[] {
  const result: DailyIssueStatus[] = [];
  const fromDate = new Date(from);
  const toDate = new Date(to);
  for (let d = new Date(fromDate); d <= toDate; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().slice(0, 10);
    const open = issues.filter(i => {
      const created = new Date(i.createdAt).getTime();
      // クローズ日が当日と同じ場合はopenに含めない
      return created <= new Date(dateStr).getTime() && (!i.closedAt || i.closedAt > dateStr);
    }).length;
    const closed = issues.filter(i => i.closedAt === dateStr).length;
    result.push({ date: dateStr, open, closed });
  }
  return result;
}
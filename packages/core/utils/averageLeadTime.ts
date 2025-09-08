import { differenceInCalendarDays } from 'date-fns';

export interface IssueWithDates {
  createdAt: string;
  closedAt?: string | null;
}

/**
 * 平均リードタイム（日数）を計算する
 * @param issues Issue配列（createdAt, closedAt必須）
 * @returns 平均リードタイム（日数, 小数点1桁）/ 完了Issueがなければnull
 */
export function calcAverageLeadTime(issues: IssueWithDates[]): number | null {
  const leadTimes = issues
    .filter(issue => issue.closedAt)
    .map(issue => differenceInCalendarDays(new Date(issue.closedAt!), new Date(issue.createdAt)));
  if (leadTimes.length === 0) return null;
  const avg = leadTimes.reduce((sum, d) => sum + d, 0) / leadTimes.length;
  return Math.round(avg * 10) / 10;
}
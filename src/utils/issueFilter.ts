import { Issue } from '../types/app';

/**
 * 指定した期間内（from〜to）に作成されたIssueのみを返す
 */
export function filterIssuesByCreatedAt(
  issues: Issue[],
  from?: string,
  to?: string
): Issue[] {
  return issues.filter((issue) => {
    const created = new Date(issue.createdAt).getTime();
    const fromTime = from ? new Date(from).getTime() : -Infinity;
    const toTime = to ? new Date(to).getTime() : Infinity;
    return created >= fromTime && created <= toTime;
  });
}

/**
 * 指定した期間内（from〜to）にクローズされたIssueのみを返す
 */
export function filterIssuesByClosedAt(
  issues: Issue[],
  from?: string,
  to?: string
): Issue[] {
  return issues.filter((issue) => {
    if (!issue.closedAt) return false;
    const closed = new Date(issue.closedAt).getTime();
    const fromTime = from ? new Date(from).getTime() : -Infinity;
    const toTime = to ? new Date(to).getTime() : Infinity;
    return closed >= fromTime && closed <= toTime;
  });
}
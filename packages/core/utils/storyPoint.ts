import { Issue } from '../types/app';

/**
 * Issue配列のストーリーポイント合計を計算
 */
export function sumStoryPoints(issues: Issue[]): number {
  return issues.reduce((sum, issue) => sum + (issue.storyPoint || 0), 0);
}

/**
 * ストーリーポイントごとにIssueをグルーピング
 */
export function groupIssuesByStoryPoint(issues: Issue[]): Record<string, Issue[]> {
  const grouped: Record<string, Issue[]> = {};
  for (const issue of issues) {
    const key = issue.storyPoint !== undefined ? String(issue.storyPoint) : '(none)';
    grouped[key] = grouped[key] || [];
    grouped[key].push(issue);
  }
  return grouped;
}
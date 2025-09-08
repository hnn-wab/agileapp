import { Issue } from '../types/app';

/**
 * ラベルごとにIssueをグルーピングする
 */
export function groupIssuesByLabel(issues: Issue[]): Record<string, Issue[]> {
  const grouped: Record<string, Issue[]> = {};
  for (const issue of issues) {
    if (!issue.labels || issue.labels.length === 0) {
      grouped['(no label)'] = grouped['(no label)'] || [];
      grouped['(no label)'].push(issue);
    } else {
      for (const label of issue.labels) {
        grouped[label] = grouped[label] || [];
        grouped[label].push(issue);
      }
    }
  }
  return grouped;
}

/**
 * マイルストーンごとにIssueをグルーピングする
 */
export function groupIssuesByMilestone(issues: Issue[]): Record<string, Issue[]> {
  const grouped: Record<string, Issue[]> = {};
  for (const issue of issues) {
    const key = issue.milestone || '(no milestone)';
    grouped[key] = grouped[key] || [];
    grouped[key].push(issue);
  }
  return grouped;
}
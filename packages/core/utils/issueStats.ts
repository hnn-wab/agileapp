export function countIssueState(issues: { state: string }[]): { open: number; closed: number } {
  return issues.reduce(
    (acc, issue) => {
      if (issue.state === 'open') acc.open++;
      if (issue.state === 'closed') acc.closed++;
      return acc;
    },
    { open: 0, closed: 0 }
  );
}
import { calcDailyIssueStatus } from './dailyIssueStatus';
import { Issue } from '../types/app';

describe('日別のIssue状態計算', () => {
  const issues: Issue[] = [
    { id: 1, title: 'A', state: 'open', labels: [], createdAt: '2025-09-01' },
    { id: 2, title: 'B', state: 'closed', labels: [], createdAt: '2025-09-01', closedAt: '2025-09-02' },
    { id: 3, title: 'C', state: 'open', labels: [], createdAt: '2025-09-02' },
    { id: 4, title: 'D', state: 'closed', labels: [], createdAt: '2025-09-03', closedAt: '2025-09-03' },
  ];

  it('日別にopen/closed件数を計算できる', () => {
    const result = calcDailyIssueStatus(issues, '2025-09-01', '2025-09-03');
    expect(result).toEqual([
      { date: '2025-09-01', open: 2, closed: 0 },
      { date: '2025-09-02', open: 2, closed: 1 },
      { date: '2025-09-03', open: 2, closed: 1 }, // ← open: 2 に修正
    ]);
  });
});
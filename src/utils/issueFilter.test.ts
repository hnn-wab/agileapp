import { filterIssuesByCreatedAt, filterIssuesByClosedAt } from './issueFilter';
import { Issue } from '../types/app';

describe('期間別フィルタリング', () => {
  const issues: Issue[] = [
    { id: 1, title: 'A', state: 'open', labels: [], createdAt: '2025-09-01' },
    { id: 2, title: 'B', state: 'closed', labels: [], createdAt: '2025-09-02', closedAt: '2025-09-03' },
    { id: 3, title: 'C', state: 'open', labels: [], createdAt: '2025-09-04' },
    { id: 4, title: 'D', state: 'closed', labels: [], createdAt: '2025-09-05', closedAt: '2025-09-06' },
  ];

  it('createdAtで期間フィルタできる', () => {
    const filtered = filterIssuesByCreatedAt(issues, '2025-09-02', '2025-09-04');
    expect(filtered.map(i => i.id)).toEqual([2, 3]);
  });

  it('closedAtで期間フィルタできる', () => {
    const filtered = filterIssuesByClosedAt(issues, '2025-09-03', '2025-09-06');
    expect(filtered.map(i => i.id)).toEqual([2, 4]);
  });

  it('from/to未指定なら全件', () => {
    expect(filterIssuesByCreatedAt(issues).length).toBe(4);
    expect(filterIssuesByClosedAt(issues).length).toBe(2);
  });
});

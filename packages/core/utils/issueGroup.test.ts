import { groupIssuesByLabel, groupIssuesByMilestone } from './issueGroup';
import { Issue } from '../types/app';

describe('ラベル・マイルストーン別グルーピング', () => {
  const issues: Issue[] = [
    { id: 1, title: 'A', state: 'open', labels: ['bug'], createdAt: '2025-09-01', milestone: 'v1' },
    { id: 2, title: 'B', state: 'closed', labels: ['feature'], createdAt: '2025-09-02', milestone: 'v1' },
    { id: 3, title: 'C', state: 'open', labels: ['bug', 'urgent'], createdAt: '2025-09-03' },
    { id: 4, title: 'D', state: 'closed', labels: [], createdAt: '2025-09-04' },
  ];

  it('ラベルごとにグルーピングできる', () => {
    const grouped = groupIssuesByLabel(issues);
    expect(Object.keys(grouped).sort()).toEqual(['(no label)', 'bug', 'feature', 'urgent']);
    expect(grouped['bug'].map(i => i.id).sort()).toEqual([1, 3]);
    expect(grouped['feature'].map(i => i.id)).toEqual([2]);
    expect(grouped['urgent'].map(i => i.id)).toEqual([3]);
    expect(grouped['(no label)'].map(i => i.id)).toEqual([4]);
  });

  it('マイルストーンごとにグルーピングできる', () => {
    const grouped = groupIssuesByMilestone(issues);
    expect(Object.keys(grouped).sort()).toEqual(['(no milestone)', 'v1']);
    expect(grouped['v1'].map(i => i.id).sort()).toEqual([1, 2]);
    expect(grouped['(no milestone)'].map(i => i.id).sort()).toEqual([3, 4]);
  });
});
import { sumStoryPoints, groupIssuesByStoryPoint } from './storyPoint';
import { Issue } from '../types/app';

describe('ストーリーポイント管理', () => {
  const issues: Issue[] = [
    { id: 1, title: 'A', state: 'open', labels: [], createdAt: '2025-09-01', storyPoint: 3 },
    { id: 2, title: 'B', state: 'closed', labels: [], createdAt: '2025-09-02', storyPoint: 5 },
    { id: 3, title: 'C', state: 'open', labels: [], createdAt: '2025-09-03' },
    { id: 4, title: 'D', state: 'closed', labels: [], createdAt: '2025-09-04', storyPoint: 3 },
  ];

  it('ストーリーポイント合計を計算できる', () => {
    expect(sumStoryPoints(issues)).toBe(11);
  });

  it('ストーリーポイントごとにグルーピングできる', () => {
    const grouped = groupIssuesByStoryPoint(issues);
    expect(Object.keys(grouped).sort()).toEqual(['(none)', '3', '5']);
    expect(grouped['3'].map(i => i.id).sort()).toEqual([1, 4]);
    expect(grouped['5'].map(i => i.id)).toEqual([2]);
    expect(grouped['(none)'].map(i => i.id)).toEqual([3]);
  });
});
import { calcRemainingWork } from './remainingWork';

describe('calcRemainingWork', () => {
  const issues = [
    { id: 1, createdAt: '2025-09-01', closedAt: undefined, storyPoint: 3 },
    { id: 2, createdAt: '2025-09-01', closedAt: '2025-09-02', storyPoint: 2 },
    { id: 3, createdAt: '2025-09-02', closedAt: undefined, storyPoint: 5 },
    { id: 4, createdAt: '2025-09-03', closedAt: '2025-09-03', storyPoint: 1 },
  ];

  it('日別の残Issue数を計算できる', () => {
    const result = calcRemainingWork(issues as any, '2025-09-01', '2025-09-03', 'count');
    expect(result).toEqual([
      { date: '2025-09-01', value: 2 },
      { date: '2025-09-02', value: 2 },
      { date: '2025-09-03', value: 2 },
    ]);
  });

  it('日別の残ストーリーポイント合計を計算できる', () => {
    const result = calcRemainingWork(issues as any, '2025-09-01', '2025-09-03', 'point');
    expect(result).toEqual([
      { date: '2025-09-01', value: 5 },
      { date: '2025-09-02', value: 8 },
      { date: '2025-09-03', value: 8 },
    ]);
  });
});
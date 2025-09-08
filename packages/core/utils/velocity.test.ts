import { calcVelocity } from './velocity';

describe('calcVelocity', () => {
  const issues = [
    { id: 1, closedAt: '2025-09-01', storyPoint: 3 },
    { id: 2, closedAt: '2025-09-02', storyPoint: 2 },
    { id: 3, closedAt: undefined, storyPoint: 5 },
    { id: 4, closedAt: '2025-09-03', storyPoint: 1 },
  ];

  it('期間内の完了Issue数を計算できる', () => {
    const result = calcVelocity(issues as any, '2025-09-01', '2025-09-02', 'count');
    expect(result).toBe(2);
  });

  it('期間内の完了ストーリーポイント合計を計算できる', () => {
    const result = calcVelocity(issues as any, '2025-09-01', '2025-09-03', 'point');
    expect(result).toBe(6);
  });
});
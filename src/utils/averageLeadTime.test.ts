import { calcAverageLeadTime, IssueWithDates } from './averageLeadTime';

describe('calcAverageLeadTime', () => {
  it('複数Issueの平均リードタイム（日数）を計算できる', () => {
    const issues: IssueWithDates[] = [
      { createdAt: '2025-09-01', closedAt: '2025-09-03' }, // 2日
      { createdAt: '2025-09-01', closedAt: '2025-09-06' }, // 5日
      { createdAt: '2025-09-01', closedAt: '2025-09-04' }, // 3日
    ];
    // (2+5+3)/3 = 3.333... → 3.3
    expect(calcAverageLeadTime(issues)).toBe(3.3);
  });

  it('完了Issueがなければnull', () => {
    const issues: IssueWithDates[] = [
      { createdAt: '2025-09-01', closedAt: null },
      { createdAt: '2025-09-01' },
    ];
    expect(calcAverageLeadTime(issues)).toBeNull();
  });
});
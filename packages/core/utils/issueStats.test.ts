import { countIssueState } from './issueStats';

describe('countIssueState', () => {
  it('open/closedの件数を正しく集計できる', () => {
    const issues = [
      { state: 'open' },
      { state: 'closed' },
      { state: 'open' },
      { state: 'closed' },
      { state: 'open' },
    ];
    const result = countIssueState(issues as any);
    expect(result.open).toBe(3);
    expect(result.closed).toBe(2);
  });

  it('空配列の場合は0件になる', () => {
    const result = countIssueState([]);
    expect(result.open).toBe(0);
    expect(result.closed).toBe(0);
  });
});

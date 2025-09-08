import { calcIdealLine } from './idealLine';

describe('calcIdealLine', () => {
  it('5日間・初期10で理想線を計算できる', () => {
    const result = calcIdealLine('2025-09-01', '2025-09-05', 10);
    expect(result).toEqual([
      { date: '2025-09-01', value: 10 },
      { date: '2025-09-02', value: 8 },
      { date: '2025-09-03', value: 6 },
      { date: '2025-09-04', value: 4 },
      { date: '2025-09-05', value: 0 },
    ]);
  });

  it('1日間の場合は初日:初期値, 最終日:0', () => {
    const result = calcIdealLine('2025-09-01', '2025-09-01', 5);
    expect(result).toEqual([
      { date: '2025-09-01', value: 0 },
    ]);
  });
});
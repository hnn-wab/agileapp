import { calcActualLine } from './actualLine';

describe('calcActualLine', () => {
  it('日別open件数から実績線を計算できる', () => {
    const dailyStatus = [
      { date: '2025-09-01', open: 10 },
      { date: '2025-09-02', open: 8 },
      { date: '2025-09-03', open: 6 },
      { date: '2025-09-04', open: 4 },
      { date: '2025-09-05', open: 0 },
    ];
    const result = calcActualLine(dailyStatus);
    expect(result).toEqual([
      { date: '2025-09-01', value: 10 },
      { date: '2025-09-02', value: 8 },
      { date: '2025-09-03', value: 6 },
      { date: '2025-09-04', value: 4 },
      { date: '2025-09-05', value: 0 },
    ]);
  });
});
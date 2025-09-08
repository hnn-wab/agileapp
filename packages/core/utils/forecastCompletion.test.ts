import { forecastCompletionDate } from './forecastCompletion';

describe('forecastCompletionDate', () => {
  it('残作業量・ベロシティ・基準日から完了予測日を計算できる', () => {
    // 残10, ベロシティ4, 1スプリント7日, 基準日2025-09-01
    // 3スプリント必要→21日後
    const result = forecastCompletionDate(10, 4, '2025-09-01', 7);
    expect(result).toBe('2025-09-22');
  });

  it('ベロシティ0以下ならnull', () => {
    expect(forecastCompletionDate(10, 0, '2025-09-01', 7)).toBeNull();
  });
});
import { addDays } from 'date-fns';

/**
 * 完了予測日を計算する
 * @param remaining 残作業量（Issue数やポイント）
 * @param velocity 1期間あたりの消化量
 * @param baseDate 予測開始日（YYYY-MM-DD）
 * @param periodDays 1期間の日数（例: 7=1スプリント）
 * @returns 完了予測日（YYYY-MM-DD）
 */
export function forecastCompletionDate(
  remaining: number,
  velocity: number,
  baseDate: string,
  periodDays: number = 7
): string | null {
  if (velocity <= 0) return null;
  const periods = Math.ceil(remaining / velocity);
  const days = periods * periodDays;
  const date = addDays(new Date(baseDate), days);
  return date.toISOString().slice(0, 10);
}
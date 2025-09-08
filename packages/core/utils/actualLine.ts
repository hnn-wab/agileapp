export interface ActualLinePoint {
  date: string;
  value: number;
}

/**
 * 実績線（actual line）を計算する
 * @param dailyStatus 日別のopen件数やポイント配列（{date, open}）
 * @returns 日付ごとの残作業量
 */
export function calcActualLine(
  dailyStatus: { date: string; open: number }[]
): ActualLinePoint[] {
  return dailyStatus.map(({ date, open }) => ({ date, value: open }));
}
export interface IdealLinePoint {
  date: string;
  value: number;
}

/**
 * 理想線（ideal line）を計算する
 * @param from 開始日（YYYY-MM-DD）
 * @param to 終了日（YYYY-MM-DD）
 * @param initialValue 初期残作業量（issue数やポイント）
 * @returns 日付ごとの理想残作業量
 */
export function calcIdealLine(
  from: string,
  to: string,
  initialValue: number
): IdealLinePoint[] {
  const result: IdealLinePoint[] = [];
  const fromDate = new Date(from);
  const toDate = new Date(to);
  const days = Math.floor((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24));
  if (days <= 0) {
    // 1日しかない場合はその日:0
    return [
      { date: fromDate.toISOString().slice(0, 10), value: 0 },
    ];
  }
  const step = Math.floor(initialValue / days);
  let value = initialValue;
  for (let i = 0; i <= days; i++) {
    const d = new Date(fromDate);
    d.setDate(fromDate.getDate() + i);
    const dateStr = d.toISOString().slice(0, 10);
    if (i === days) {
      result.push({ date: dateStr, value: 0 });
    } else {
      result.push({ date: dateStr, value });
      value -= step;
    }
  }
  return result;
}
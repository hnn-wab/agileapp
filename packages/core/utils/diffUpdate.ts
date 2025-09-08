export type DiffResult<T> = {
  added: T[];
  updated: T[];
  removed: T[];
};

/**
 * 差分更新ロジック
 * @param prev 前回データ配列
 * @param next 新データ配列
 * @param getId id取得関数（デフォルトはidプロパティ）
 */
export function diffUpdate<T>(
  prev: T[],
  next: T[],
  getId: (item: T) => string | number = (item: any) => item.id
): DiffResult<T> {
  const prevMap = new Map<string | number, T>();
  prev.forEach(item => prevMap.set(getId(item), item));
  const nextMap = new Map<string | number, T>();
  next.forEach(item => nextMap.set(getId(item), item));

  const added: T[] = [];
  const updated: T[] = [];
  const removed: T[] = [];

  for (const [id, item] of nextMap) {
    if (!prevMap.has(id)) {
      added.push(item);
    } else if (JSON.stringify(prevMap.get(id)) !== JSON.stringify(item)) {
      updated.push(item);
    }
  }
  for (const [id, item] of prevMap) {
    if (!nextMap.has(id)) {
      removed.push(item);
    }
  }
  return { added, updated, removed };
}
import { diffUpdate } from './diffUpdate';

describe('diffUpdate', () => {
  const prev = [
    { id: 1, title: 'A' },
    { id: 2, title: 'B' },
    { id: 3, title: 'C' },
  ];
  const next = [
    { id: 2, title: 'B (updated)' },
    { id: 3, title: 'C' },
    { id: 4, title: 'D' },
  ];

  it('追加・更新・削除を正しく検出できる', () => {
    const result = diffUpdate(prev, next);
    expect(result.added).toEqual([
      { id: 4, title: 'D' },
    ]);
    expect(result.updated).toEqual([
      { id: 2, title: 'B (updated)' },
    ]);
    expect(result.removed).toEqual([
      { id: 1, title: 'A' },
    ]);
  });

  it('idプロパティ以外でも比較できる', () => {
    const prev2 = [ { key: 'x', v: 1 } ];
    const next2 = [ { key: 'x', v: 2 } ];
    const result = diffUpdate(prev2, next2, item => item.key);
    expect(result.updated).toEqual([{ key: 'x', v: 2 }]);
  });
});
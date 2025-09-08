import { MemoryCache } from './memoryCache';

describe('MemoryCache', () => {
  it('set/getで値を保存・取得できる', () => {
    const cache = new MemoryCache<number>();
    cache.set('foo', 123);
    expect(cache.get('foo')).toBe(123);
  });

  it('clearで値を削除できる', () => {
    const cache = new MemoryCache<string>();
    cache.set('bar', 'baz');
    cache.clear('bar');
    expect(cache.get('bar')).toBeUndefined();
  });

  it('clearAllで全削除できる', () => {
    const cache = new MemoryCache();
    cache.set('a', 1);
    cache.set('b', 2);
    cache.clearAll();
    expect(cache.get('a')).toBeUndefined();
    expect(cache.get('b')).toBeUndefined();
  });

  it('ttl付きで期限切れ後はundefinedになる', (done) => {
    const cache = new MemoryCache<string>();
    cache.set('ttl', 'val', 100);
    setTimeout(() => {
      expect(cache.get('ttl')).toBeUndefined();
      done();
    }, 150);
  });
});
export class MemoryCache<T = any> {
  private cache = new Map<string, { value: T; expireAt?: number }>();

  /**
   * 値をキャッシュに保存
   * @param key キー
   * @param value 値
   * @param ttl 有効期限（ミリ秒）
   */
  set(key: string, value: T, ttl?: number) {
    const expireAt = ttl ? Date.now() + ttl : undefined;
    this.cache.set(key, { value, expireAt });
  }

  /**
   * キャッシュから値を取得
   * @param key キー
   * @returns 値 or undefined
   */
  get(key: string): T | undefined {
    const entry = this.cache.get(key);
    if (!entry) return undefined;
    if (entry.expireAt && entry.expireAt < Date.now()) {
      this.cache.delete(key);
      return undefined;
    }
    return entry.value;
  }

  /**
   * キャッシュを削除
   * @param key キー
   */
  clear(key: string) {
    this.cache.delete(key);
  }

  /**
   * キャッシュ全体をクリア
   */
  clearAll() {
    this.cache.clear();
  }

  /**
   * 指定したprefixで始まるキーのキャッシュを一括削除
   * @param prefix キーのprefix
   */
  invalidateByPrefix(prefix: string) {
    for (const key of this.cache.keys()) {
      if (key.startsWith(prefix)) {
        this.cache.delete(key);
      }
    }
  }
}
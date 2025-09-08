// 認証の抽象化インターフェース定義
// 販売方法や配布形態に依存しない認証設計

export interface AuthProvider {
  /**
   * 認証トークンを取得する
   * Web/Electron/拡張機能など、配布形態ごとに実装を切り替え可能
   */
  getToken(): string;
}

// 開発用（Personal Access Token）の暫定実装例
export class PatAuthProvider implements AuthProvider {
  private token: string;
  constructor(token: string) {
    this.token = token;
  }
  getToken(): string {
    return this.token;
  }
}

// 今後、OAuthや他の認証方式にも拡張可能

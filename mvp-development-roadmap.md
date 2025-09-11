# MVP開発ロードマップ - React/Next.js/TypeScript版

## 開発方針

**販売方法に依存しない実装**を行い、後から任意の配布形態（Web/Electron/拡張機能）に対応できる設計とする。

---

## Phase 1: プロジェクトセットアップ（Day 1-2）

### 1.1 開発環境構築

- [x] Node.js 18+ インストール確認
- [x] Git/GitHubリポジトリ作成
- [x] VSCode + 拡張機能セットアップ

### 1.2 プロジェクト初期化

- [x] Next.jsプロジェクト作成（TypeScript有効）
- [x] ディレクトリ構造の設計
- [x] ESLint/Prettier設定
- [x] git hooks設定（husky）

### 1.3 必要パッケージインストール

- [x] GitHub API関連：@octokit/rest, @octokit/types
- [x] チャート描画：recharts or chart.js
- [x] 状態管理：zustand or jotai（軽量で配布方法に依存しない）
- [x] 日付処理：date-fns
- [x] スタイリング：Tailwind CSS
- [x] テスト：Jest, React Testing Library

### 1.4 プロジェクト構造作成

```
src/
├── core/           # 販売方法に依存しないコア機能
├── components/     # React UIコンポーネント
├── hooks/          # カスタムフック
├── utils/          # ユーティリティ関数
├── types/          # TypeScript型定義
└── pages/          # Next.jsページ（開発用）
```

---

## Phase 2: GitHub API連携のコア実装（Day 3-7）

### 2.1 型定義の作成

- [x] GitHub APIレスポンスの型定義
- [x] アプリケーション内部のデータモデル定義
- [x] エラー型の定義

### 2.2 GitHub APIクライアント作成

- [x] 基本的なAPIクライアントクラス設計
- [x] 認証の抽象化（インターフェース定義）
- [x] エラーハンドリング設計
- [x] レート制限対策の実装

### 2.3 主要API機能の実装

- [x] リポジトリ情報取得
- [x] Issue一覧取得（ページネーション対応）
- [x] Issue詳細取得
- [x] Milestone取得
- [x] Label取得

### 2.4 データ変換層

- [x] GitHub APIレスポンス → 内部データモデル変換
- [x] フィルタリング・ソート機能
- [x] データ正規化処理

### 2.5 開発用の認証実装

- [x] Personal Access Token使用の暫定実装
- [x] 環境変数からのトークン読み込み
- [x] 認証プロバイダーインターフェース作成

---

## Phase 3: データ処理・ビジネスロジック（Day 8-12）

### 3.1 Issue管理ロジック

- [x] Issue集計機能（open/closed カウント）
- [x] 期間別フィルタリング
- [x] ラベル・マイルストーン別グルーピング
- [x] ストーリーポイント管理（カスタムフィールド対応）

### 3.2 バーンダウン計算エンジン

- [x] 日別のIssue状態計算
- [x] 理想線（ideal line）の計算
- [x] 実績線（actual line）の計算
- [x] 残作業量の計算（Issue数/ストーリーポイント）

### 3.3 データキャッシュ層

- [x] メモリキャッシュ実装
- [x] キャッシュ無効化戦略
- [x] 差分更新ロジック

### 3.4 統計・分析機能

- [x] ベロシティ計算
- [x] 完了予測日計算
- [x] 平均リードタイム計算

---

## Phase 4: OAuth認証への移行（Day 13-15）

### 4.1 GitHub OAuth実装
- [x] GitHub OAuth App登録
- [x] NextAuth.js導入と基本設定
- [x] 認証フロー実装
  - [x] ログイン/ログアウト
  - [x] セッション管理
  - [x] トークンの安全な保存

### 4.2 既存コードの調整
- [x] PAT認証からOAuth認証への切り替え
- [x] APIクライアントの認証部分修正
- [x] エラーハンドリングの更新

### 4.3 最小限のユーザー管理
- [ ] ユーザーテーブル作成（Supabase）
```sql
users (
  id, 
  github_id, 
  email, 
  access_token (暗号化), 
  created_at
)
```
- [ ] ユーザーセッション管理

---

## Phase 5: 基本UIコンポーネント（Day 16-20）

### 5.1 認証関連UI
- [ ] ログインページ（GitHubでログインボタンのみ）
- [ ] ヘッダー（ユーザー情報表示、ログアウト）

### 5.2 メインダッシュボード
- [ ] リポジトリ選択ドロップダウン
- [ ] 選択したリポジトリの基本情報表示

### 5.3 Issue一覧（Phase 3のロジック活用）
- [ ] Issue一覧表示
- [ ] 基本的なフィルター（Open/Closed）
- [ ] ページネーション

### 5.4 バーンダウンチャート
- [ ] チャート表示（Phase 3の計算ロジック使用）
- [ ] 期間選択（直近30日/60日/90日）
- [ ] Issue数表示のみ（ストーリーポイントは後回し）

### 5.5 最小限の共通コンポーネント
- [ ] ローディング表示
- [ ] エラー表示
- [ ] 空状態の表示

---

## Phase 6: データ永続化（Day 21-23）

### 6.1 必要最小限のDB設計
```sql
-- ユーザーの選択したリポジトリ
user_repositories (
  user_id,
  github_repo_id,
  repo_name,
  last_accessed
)

-- バーンダウンデータのキャッシュ（オプション）
burndown_cache (
  repo_id,
  date,
  open_issues,
  closed_issues,
  calculated_at
)
```

### 6.2 データ取得の最適化
- [ ] GitHub API呼び出しの最小化
- [ ] 簡単なメモリキャッシュ実装
- [ ] レート制限対応

---

## Phase 7: デプロイとテスト（Day 24-27）

### 7.1 本番環境セットアップ
- [ ] Vercelへのデプロイ設定
- [ ] 環境変数設定
  - [ ] GITHUB_CLIENT_ID
  - [ ] GITHUB_CLIENT_SECRET
  - [ ] NEXTAUTH_SECRET
  - [ ] DATABASE_URL
- [ ] Supabase本番環境設定

### 7.2 基本的なテスト
- [ ] 認証フローのE2Eテスト
- [ ] 主要機能の動作確認
- [ ] エラーケースの確認

### 7.3 パフォーマンス確認
- [ ] ページロード速度
- [ ] API応答時間
- [ ] 基本的なエラー監視（Vercelの標準機能）

---

## Phase 8: MVP公開準備（Day 28-30）

### 8.1 必須ドキュメント
- [ ] 簡単な使い方ガイド
- [ ] プライバシーポリシー（最小限）
- [ ] 利用規約（最小限）

### 8.2 フィードバック収集準備
- [ ] Google Formでフィードバックフォーム作成
- [ ] アプリ内にフィードバックリンク設置

### 8.3 段階的公開
- [ ] 限定URLで友人・知人に共有
- [ ] フィードバック収集（1週間）
- [ ] 致命的なバグ修正
- [ ] 一般公開

---

## 技術スタック（MVP版）

### 必須のみ
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Auth**: NextAuth.js
- **Database**: Supabase（無料プラン）
- **Charts**: Recharts
- **Hosting**: Vercel（無料プラン）
- **State**: React hooks（useStateで十分）

### 後回しにするもの
- ❌ Redis（キャッシュ）
- ❌ Stripe（課金）
- ❌ メール送信
- ❌ 高度な監視ツール
- ❌ Storybook
- ❌ GraphQL

---

## MVP完成の定義

### 必須機能 ✅
- [ ] GitHubでログインできる
- [ ] 自分のリポジトリを選択できる
- [ ] Issue一覧が見られる
- [ ] バーンダウンチャートが表示される
- [ ] データが自動更新される

### あったら良い機能（Phase 2）
- [ ] マイルストーン対応
- [ ] ストーリーポイント対応
- [ ] チャートのカスタマイズ
- [ ] データエクスポート
- [ ] 複数リポジトリの比較

### 将来的な機能（Phase 3以降）
- [ ] チーム機能
- [ ] 有料プラン
- [ ] Slack連携
- [ ] AIによる予測

---

## 簡略化した実装方針

### 1. 認証
```typescript
// シンプルなNextAuth設定
export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: { params: { scope: 'repo' } }
    })
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    }
  }
})
```

### 2. データ取得
```typescript
// 既存のPhase 3のロジックを活用
const { data: issues } = useSWR(
  [`/api/issues`, repoId],
  fetcher,
  { refreshInterval: 300000 } // 5分ごと
)
```

### 3. UI最小化
- ページ数: 3ページのみ（ログイン、ダッシュボード、404）
- コンポーネント数: 10個以下
- スタイリング: Tailwind CSSのユーティリティクラスのみ

---

## 2週間スプリント計画

### Week 1: 認証とUI
- **Day 1-3**: OAuth実装とユーザー管理
- **Day 4-7**: UIコンポーネント作成

### Week 2: 統合とデプロイ
- **Day 8-9**: Phase 3のロジックとUI統合
- **Day 10-11**: Vercelデプロイとテスト
- **Day 12-14**: バグ修正と最終調整

---

## 成功指標（MVP段階）

### 技術指標
- [ ] エラー発生率 < 1%
- [ ] ページロード < 5秒
- [ ] GitHub API制限内で動作

### ユーザー指標（最初の1ヶ月）
- [ ] 10人以上が使用
- [ ] 5人以上からフィードバック
- [ ] 致命的なバグゼロ

---

## リスクと対策

### 対処すべきリスク
- **GitHub API制限**: 
  - 対策: 5分間隔の更新制限
- **認証エラー**: 
  - 対策: 明確なエラーメッセージとリトライ
- **データ量過多**: 
  - 対策: 最大100 Issueまでの表示制限

### 受け入れるリスク（MVP段階）
- スケーラビリティの制限
- 機能の少なさ
- UIの洗練度不足

---

## 即座に着手すること

### 今日中に
1. GitHub OAuth App登録
2. Supabaseプロジェクト作成
3. Vercelプロジェクト作成

### 明日から
1. NextAuth.js実装
2. 既存コードのOAuth対応
3. 最小限のUI作成

---

## コスト見積もり（月額）

### MVP段階（無料）
- Vercel: 無料プラン
- Supabase: 無料プラン
- GitHub API: 無料枠内

### 成長段階（〜$50/月）
- Vercel Pro: $20/月
- Supabase Pro: $25/月
- ドメイン: $1/月

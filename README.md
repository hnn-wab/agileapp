# agileapp

React/Next.js/TypeScriptによるアジャイル開発支援MVP。

## セットアップ

リポジトリのルート（`agileapp` ディレクトリ）で以下を実行してください。

```bash
cd agileapp
npm install
```

※ `apps/frontend` など各パッケージの依存も自動的にインストールされます。

## 環境変数の設定例

GitHub APIを利用するには、`apps/frontend/.env.local` に以下のようにPersonal Access Tokenを記載してください。

```env
NEXT_PUBLIC_GITHUB_TOKEN=your_github_pat_here
```

※ `.env.local` はセキュリティのためgit管理されません。各自で作成・設定してください。

## 開発サーバー起動

```bash
npm run dev
```

## 主な技術

- Next.js
- TypeScript
- Tailwind CSS
- Zustand
- Chart.js
- Octokit
- Jest / React Testing Library

## 推奨VSCode拡張機能

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- GitLens
- GitHub Pull Requests and Issues
- Jest Runner
- vscode-icons
- EditorConfig

## ライセンス

MIT

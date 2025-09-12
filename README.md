# agileapp


React/Next.js/TypeScriptによるアジャイル開発支援MVP。

## 主な技術

- Next.js
- TypeScript
- Tailwind CSS
- Zustand
- Chart.js
- Octokit
- Jest / React Testing Library

## セットアップ手順

### 1. ローカル環境で一緒に動かす場合

1. このリポジトリをGitHub等で共有し、使いたい人に`git clone`してもらいます。
2. それぞれのPCで以下を実行します。

	```bash
	npm install
	# 必要に応じて: cd apps/frontend && npm install
	```

環境変数ファイル（例: .env.local）を作成し、必要な値（管理者や開発者から共有されたもの）を記入します。
	- `GITHUB_CLIENT_ID`（GitHub OAuthアプリのClient ID）
	- `GITHUB_CLIENT_SECRET`（GitHub OAuthアプリのClient Secret）
	- `NEXTAUTH_SECRET`（NextAuth.js用のランダムな文字列）

4. 開発サーバーを起動します。

	```bash
	npm run dev
	```

5. ブラウザで `http://localhost:3000` にアクセスします。


**注意:**
- GitHub認証やAPI制限の都合で、全員が同じGitHubアカウントやトークンを使う場合は注意してください。
- 本格的な共有や外部公開にはVercel等でのデプロイを推奨します。

### 2. Vercelなどでデプロイする

- [Vercel](https://vercel.com/)にGitHubリポジトリを連携し、デプロイします。
- デプロイ後、発行されたURL（例: `https://your-app.vercel.app`）を他の人に共有してください。

### 3. GitHub OAuthアプリの設定

- GitHubログインを有効にするには、GitHub OAuthアプリを作成し、
  - `GITHUB_CLIENT_ID`
  - `GITHUB_CLIENT_SECRET`
  - `NEXTAUTH_SECRET`
 などをVercelや`.env.local`に設定してください。
- 詳細は `apps/frontend/.env.example` も参照。

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

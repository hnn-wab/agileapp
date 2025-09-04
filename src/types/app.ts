// アプリケーション内部で使うデータモデル定義例
// GitHub APIの型を元に、UIやロジックで使いやすい形に変換・拡張します

// Issueの内部モデル例
export interface Issue {
  id: number;
  title: string;
  state: 'open' | 'closed';
  labels: string[];
  milestone?: string;
  createdAt: string;
  closedAt?: string;
  storyPoint?: number; // 独自フィールド（バーンダウン用）
}

// リポジトリの内部モデル例
export interface Repository {
  id: number;
  name: string;
  owner: string;
  description?: string;
}

// バーンダウンチャート用データモデル例
export interface BurndownData {
  date: string;
  openIssues: number;
  closedIssues: number;
  remainingPoints: number;
}

// 必要に応じて追加・カスタマイズしてください

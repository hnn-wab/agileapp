<<<<<<< HEAD
// GitHub APIレスポンス型定義（例: Repository, Issue, Milestone, Label, User, Errorなど）
// 必要に応じて@octokit/typesの型を拡張・再利用します

import { components } from '@octokit/openapi-types';

export type GitHubRepository = components['schemas']['repository'];
export type GitHubIssue = components['schemas']['issue'];
export type GitHubMilestone = components['schemas']['milestone'];
export type GitHubLabel = components['schemas']['label'];
export type GitHubError = components['schemas']['basic-error'];

// ページネーション対応のレスポンス例
export interface GitHubPaginatedIssues {
  total_count: number;
  items: GitHubIssue[];
}

// 必要に応じて追加・カスタマイズしてください
=======
// GitHub APIレスポンス型定義
export interface Issue {
  id: number;
  number: number;
  title: string;
  state: string;
  body?: string;
  labels: any[];
  assignees: any[];
  milestone?: Milestone;
  created_at: string;
  updated_at: string;
  closed_at?: string;
  user: any;
  comments: number;
}

export interface Milestone {
  id: number;
  number: number;
  title: string;
  description?: string;
  state: string;
  open_issues: number;
  closed_issues: number;
  created_at: string;
  updated_at: string;
  due_on?: string;
  closed_at?: string;
}

export interface Label {
  id: number;
  name: string;
  color: string;
  description?: string;
  default: boolean;
}
>>>>>>> 51e55cef (add scripts section to package.json and setup for Next.js dev server)

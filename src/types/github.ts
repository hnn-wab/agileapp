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

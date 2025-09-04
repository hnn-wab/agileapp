// GitHub APIクライアントの基本設計例
// 販売方法に依存しないコア機能として設計

import { Octokit } from '@octokit/rest';
import type { Issue, Repository } from '../types/app';
import type { GitHubApiError } from '../types/error';
import { GitHubLabel } from '../types/github';

export interface AuthProvider {
  getToken(): string;
}

export class GitHubApiClient {
  /**
   * ページネーション対応の全ラベル取得
   */
  async getAllLabels(owner: string, repo: string): Promise<GitHubLabel[]> {
    let page = 1;
    const perPage = 100;
    let allLabels: GitHubLabel[] = [];
    while (true) {
      const res = await this.octokit.issues.listLabelsForRepo({ owner, repo, per_page: perPage, page });
      allLabels = allLabels.concat(res.data as GitHubLabel[]);
      if (res.data.length < perPage) break;
      page++;
    }
    return allLabels;
  }
  /**
   * ページネーション対応のIssue一覧取得
   */
  async getIssuesPaginated(owner: string, repo: string, page: number = 1, perPage: number = 30): Promise<Issue[]> {
    const res = await this.octokit.issues.listForRepo({ owner, repo, page, per_page: perPage });
    return res.data.map(issue => ({
      id: issue.id,
      title: issue.title,
      state: issue.state as 'open' | 'closed',
      labels: issue.labels.map(l => typeof l === 'string' ? l : l.name ?? ''),
      milestone: issue.milestone?.title,
      createdAt: issue.created_at,
      closedAt: issue.closed_at ?? undefined,
    }));
  }
  private octokit: Octokit;

  constructor(authProvider: AuthProvider) {
    this.octokit = new Octokit({ auth: authProvider.getToken() });
  }

  async getRepository(owner: string, repo: string): Promise<Repository> {
    const res = await this.octokit.repos.get({ owner, repo });
    return {
      id: res.data.id,
      name: res.data.name,
      owner: res.data.owner.login,
      description: res.data.description ?? '',
    };
  }

  async getIssues(owner: string, repo: string): Promise<Issue[]> {
    const res = await this.octokit.issues.listForRepo({ owner, repo });
    return res.data.map(issue => ({
      id: issue.id,
      title: issue.title,
      state: issue.state as 'open' | 'closed',
      labels: issue.labels.map(l => typeof l === 'string' ? l : l.name ?? ''),
      milestone: issue.milestone?.title,
      createdAt: issue.created_at,
      closedAt: issue.closed_at ?? undefined,
      storyPoint: undefined, // 必要に応じて拡張
    }));
  }

  // 必要に応じて他のAPIメソッドも追加
}

// GitHub APIのレート制限対策実装例
// APIレスポンスのヘッダーからレート制限情報を取得し、警告やリトライ処理を行う

import { Octokit } from '@octokit/rest';

export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number; // UNIXタイムスタンプ
}

export function getRateLimitInfo(response: any): RateLimitInfo | null {
  if (!response || !response.headers) return null;
  const { headers } = response;
  return {
    limit: Number(headers['x-ratelimit-limit']),
    remaining: Number(headers['x-ratelimit-remaining']),
    reset: Number(headers['x-ratelimit-reset']),
  };
}

export function isRateLimited(rate: RateLimitInfo): boolean {
  return rate.remaining <= 0;
}

// APIクライアントでの利用例
// const res = await octokit.issues.listForRepo(...);
// const rate = getRateLimitInfo(res);
// if (rate && isRateLimited(rate)) {
//   // 警告表示やリトライ処理
// }

// 必要に応じて、リトライ/待機/通知などの処理も追加可能

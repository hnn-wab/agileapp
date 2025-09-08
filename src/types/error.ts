// アプリケーション内部で使うエラー型定義
// GitHub APIエラーとアプリ独自エラーを統一的に扱うための型

import { components } from '@octokit/openapi-types';

// GitHub APIの基本エラー型
export type GitHubApiError = components['schemas']['basic-error'];

// アプリケーション独自のエラー型
export interface AppError {
  code: string; // エラーコード（例: 'NETWORK_ERROR', 'AUTH_ERROR', 'VALIDATION_ERROR'など）
  message: string; // エラーメッセージ
  detail?: any; // 追加情報（任意）
  source?: 'github' | 'app'; // エラー発生元
}

// エラーを一元管理するためのUnion型
export type ErrorType = GitHubApiError | AppError;

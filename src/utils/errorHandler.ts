<<<<<<< HEAD
// エラーハンドリング設計例
// API・アプリ両方のエラーを一元管理し、UI/ロジックで使いやすくする

import type { ErrorType } from '../types/error';

/**
 * API呼び出し時のエラーハンドリング関数
 * - エラー型に変換して返す
 * - 必要に応じてログ出力や通知も可能
 */
export function handleApiError(error: unknown): ErrorType {
  if (typeof error === 'object' && error !== null && 'message' in error) {
    // GitHub APIエラー or JS Error
    return {
      code: 'API_ERROR',
      message: (error as any).message,
      detail: error,
      source: 'github',
    };
  }
  // その他のエラー
  return {
    code: 'UNKNOWN_ERROR',
    message: '予期しないエラーが発生しました',
    detail: error,
    source: 'app',
  };
}

/**
 * UIで使うエラー表示用のユーティリティ
 */
export function getErrorMessage(error: ErrorType): string {
  return error.message || 'エラーが発生しました';
}

// 必要に応じて、エラー通知・ロギング・リトライ処理なども追加可能
=======
import { ErrorType } from '../types/error';

export function handleApiError(error: any): ErrorType {
  if (error.status) {
    return {
      type: 'api',
      message: error.message || 'API error',
      status: error.status,
      details: error,
    };
  }
  if (error.name === 'HttpError') {
    return {
      type: 'network',
      message: error.message || 'Network error',
      details: error,
    };
  }
  if (error.name === 'AuthenticationError') {
    return {
      type: 'auth',
      message: error.message || 'Authentication error',
      details: error,
    };
  }
  return {
    type: 'unknown',
    message: error?.message || 'Unknown error',
    details: error,
  };
}
>>>>>>> 51e55cef (add scripts section to package.json and setup for Next.js dev server)

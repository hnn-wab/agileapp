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
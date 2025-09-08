// アプリケーション共通エラー型定義
export interface ErrorType {
	type: 'api' | 'network' | 'auth' | 'unknown';
	message: string;
	status?: number;
	details?: any;
}

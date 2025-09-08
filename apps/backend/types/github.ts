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

export interface User {
	name: string;
	bio: string;
	login: string;
	avatar_url: string;
	html_url: string;
	company: string;
	followers: number;
}

export interface Repo {
	id: number;
	name: string;
	description: string;
	updated_at: string;
	language: string;
	archived: boolean;
	has_pages: boolean;
	has_issues: boolean;
}

export interface UserResponse {
	login: string;
}

export type ReposResponse = Repo[];

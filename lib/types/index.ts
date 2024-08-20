export type TConfession = {
	_id?: string;
	avatar: string;
	likes: number;
	comments: string[];
	createdAt: string;
	author: string;
	content: string;
};

export type TComment = {
	_id: string;
	avatar: string;
	content: string;
};

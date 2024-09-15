
// Assuming this is the structure returned by `getSingleConfession`
export type TComment = {
	_id: string;
	author: string;
	avatar?: string;
	content: string;
	createdAt: Date
};

export type TConfession = {
	_id: string;
	content: string;
	author: string;
	avatar: string;
	likes: string[];
	createdAt: string;
	feeling: string;
	comments: TComment[];
};

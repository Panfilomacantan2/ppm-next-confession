// export type TConfession = {
// 	_id?: string;
// 	avatar: string;
// 	likes: number;
// 	comments: string[];
// 	createdAt: string;
// 	author: string;
// 	content: string;
// };

// export type TComment = {
// 	_id: string;
// 	avatar: string;
// 	content: string;
// };


// Assuming this is the structure returned by `getSingleConfession`
export type TComment = {
    _id: string;
    author: string;
    avatar?: string;
    content: string;
};

export type TConfession = {
    _id: string;
    content: string;
    author: string;
    comments: TComment[];
};


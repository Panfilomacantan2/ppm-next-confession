import { TComment, TConfession } from '@/lib/types';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

const CommentLists = ({ confession }: { confession: TConfession }) => {
	const comments = confession.comments as TComment[];
	const lastCommentRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (lastCommentRef.current) {
			// Ensure the parent container scrolls, not the entire page
			lastCommentRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
			});
		}
	}, [comments]);

	if (!comments.length) {
		return <div className="text-center text-foreground/60 my-10">No comments yet!</div>;
	}

	return (
		<div className="max-h-40 scrollbar-hidden hover:scrollbar overflow-y-scroll overflow-x-hidden my-4">
			{comments.map((comment, index) => (
				<div key={comment._id} className="w-full flex items-start space-x-3 p-4 pb-0 shadow rounded-lg" ref={index === comments.length - 1 ? lastCommentRef : null}>
					<div className="flex-shrink-0">
						{comment.avatar ? <Image src={comment.avatar} alt={comment.author} width={35} height={35} className="rounded-full" /> : <div className="rounded-full bg-gray-300 h-5 w-5"></div>}
					</div>
					<div className="max-w-full border border-border p-2 rounded-md ">
						<div className="flex items-center justify-between">
							<p className="text-foreground/90 text-sm">{comment.author}</p>
							<span className="text-xs text-foreground/80">{/* Add timestamp here if available */}</span>
						</div>
						<p className="text-sm text-foreground/70 text-left break-words w-full overflow-hidden">{comment.content}</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default CommentLists;

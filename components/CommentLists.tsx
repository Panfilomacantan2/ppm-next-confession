import { getSingleConfession } from '@/lib/actions/confession.actions';
import { TComment, TConfession } from '@/lib/types';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const CommentLists = ({ confessionId }: { confessionId: string }) => {
	const [comments, setComments] = useState<TComment[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const fetchedConfession = (await getSingleConfession(confessionId)) as TConfession;

				if (fetchedConfession) {
					setComments(fetchedConfession.comments);
					console.log(fetchedConfession.comments);
				}
			} catch (error) {
				console.error('Failed to fetch confession:', error);
				// Handle error (e.g., set an error state and display a message to the user)
			}
		};

		fetchData();
	}, [confessionId]);

	if (!comments.length) {
		return <p className="py-4">No comments yet!</p>;
	}

	return (
		<div className="max-h-40 scrollbar-hidden hover:scrollbar overflow-y-scroll my-4">
			{comments.map((comment) => (
				<div key={comment._id} className="flex items-start space-x-3 p-4 pb-0 shadow rounded-lg">
					<div className="flex-shrink-0">
						{comment.avatar ? <Image src={comment.avatar} alt={comment.author} width={40} height={40} className="rounded-full" /> : <div className="rounded-full bg-gray-300 h-10 w-10"></div>}
					</div>
					<div className="max-w-fit border border-border p-2 rounded-md ">
						<div className="flex items-center justify-between">
							<p className="text-foreground/90">{comment.author}</p>
							<span className="text-xs text-foreground/80">{/* Add timestamp here if available */}</span>
						</div>
						<p className="mt-1 text-foreground/70 text-left">{comment.content}</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default CommentLists;

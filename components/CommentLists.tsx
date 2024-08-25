import { TComment, TConfession } from '@/lib/types';
import Image from 'next/image';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRef } from 'react';

dayjs.extend(relativeTime);

const CommentLists = ({ confession }: { confession: TConfession }) => {
	const latestCommentRef = useRef<HTMLDivElement>(null);

	if (latestCommentRef.current) {
		latestCommentRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
	}

	return (
		<div className="max-h-40 scrollbar-hidden hover:scrollbar overflow-y-scroll overflow-x-hidden my-4">
			{confession.comments.map((comment: TComment, index: number) => (
				<div key={comment._id} className="w-full flex items-start space-x-3 p-4 pb-0 " ref={index === confession.comments.length - 1 ? latestCommentRef : null}>
					<div className="flex-shrink-0">
						{comment.avatar ? <Image src={comment.avatar} alt={comment.author} width={35} height={35} className="rounded-full" /> : <div className="rounded-full bg-gray-300 h-5 w-5"></div>}
					</div>
					<div className="max-w-full border border-border p-2 rounded-md ">
						<div className="flex items-start justify-start flex-col">
							<p className="text-foreground/80 text-sm">{comment.author}</p>
							<span className="text-[11px] text-foreground/60">{dayjs(comment.createdAt).fromNow(true)}</span>
						</div>
						<p className="text-sm text-foreground/90 font-extralight text-left break-words w-full overflow-hidden">{comment.content}</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default CommentLists;

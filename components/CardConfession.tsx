import React from 'react';
import { TConfession } from '@/lib/types';
import { Card, CardFooter } from './ui/card';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';
import CommentInputForm from './CommentInput';
import CommentLists from './CommentLists';
dayjs.extend(relativeTime);

const CardConfession = ({ confession, user, confessionId }: { confession: TConfession; user: any; confessionId: string }) => {
	return (
		<Card className="w-full max-w-lg min-h-[260px] text-center relative py-8 px-4  hover:border-blue-400/30">
			<div className="flex items-center justify-start gap-x-2">
				<div className="h-9 w-9">
					{!confession.avatar ? (
						<div className="animate-pulse">
							<div className="rounded-full bg-slate-200 dark:bg-slate-700 h-9 w-9"></div>
						</div>
					) : (
						<div className="h-9 w-9 rounded-full overflow-hidden">
							<Image src={confession.avatar} width={22} height={22} alt={confession.author} className="w-full h-full object-cover" />
						</div>
					)}
				</div>

				<div className="flex flex-col justify-start items-centers">
					<p className="text-sm text-foreground text-left">{confession.author}</p>
					<p className="text-xs text-foreground/60 text-left">{dayjs(confession.createdAt).fromNow()}</p>
				</div>
			</div>

			<p className="text-foreground my-5 text-left text-[14px]">{confession.content}</p>

			<CommentLists confession={confession} />

			<CardFooter className="p-0 flex justify-center items-center">
				<CommentInputForm user={user} confession={confession} confessionId={confessionId} />
			</CardFooter>
		</Card>
	);
};

export default CardConfession;

'use client';

import { TConfession } from '@/lib/types';
import { ThumbsUp } from 'lucide-react';

const LikeButton = ({ confession, onClick }: { confession: TConfession; onClick: (id: string) => void }) => {
	return (
		<div className="flex gap-x-1">
			<ThumbsUp
				size={18}
				className="cursor-pointer"
				onClick={() => {
					if (confession?._id) {
						onClick(confession?._id);
					}
				}}
			/>
			<p className="text-foreground/90 text-xs mt-[6px]">
				{confession?.likes}
				{confession?.likes > 1 ? ' Likes' : ' Like'}
			</p>
		</div>
	);
};

export default LikeButton;

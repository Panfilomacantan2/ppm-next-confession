'use client';

import { TConfession } from '@/lib/types';
import { MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

const CommentButton = ({ confession }: { confession: TConfession }) => {
	const router = useRouter();

	const handleConfession = useCallback(() => {
		router.push(`/confession/${confession?._id?.toString()}`);
	}, [router, confession?._id]);

	return (
		<div className="flex gap-x-1 cursor-pointer white" onClick={handleConfession}>
			<MessageCircle size={18} />
			<p className="text-foreground/90 text-xs mt-[6px]">
				{confession?.comments?.length} {confession?.comments?.length > 1 ? 'comments' : 'comment'}
			</p>
		</div>
	);
};

export default CommentButton;

'use client';

import { Card, CardFooter } from '@/components/ui/card';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';
import LikeButton from '@/components/LikeButton';
import CommentButton from '@/components/CommentButton';
import AutoFitLayout from '@/components/AutoFitLayout';
import PaginationComponent from '@/components/Pagination';
import { TConfession } from '@/lib/types';
import { useConfessionSWR } from '@/lib/helper';
import { mutate } from 'swr';

dayjs.extend(relativeTime);

interface ConfessionListProps {
	searchParams: { [key: string]: string };
}

export default function ConfessionList({ searchParams }: ConfessionListProps) {
	const {
		data: confessions,
		error,
		isLoading,
	} = useConfessionSWR('/api/confession', {
		onSuccess: (data: any) => {
			data.sort((a: TConfession, b: TConfession) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix());
		},
	});

	const per_page = parseInt(searchParams['per_page']) || 12;
	const page = parseInt(searchParams['page']) || 1;
	const start = (page - 1) * per_page;
	const end = start + per_page;
	// const entries = confessions?.slice(start, end);

	const handleLikeConfession = async (id: string) => {
		try {
			const response = await fetch(`/api/like`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ id }),
			});

			console.log(await response.json());

			if (!response.ok) throw new Error('Failed to like the confession.');

			await mutate(`/api/confession`);
		} catch (error) {
			console.error('Failed to like confession:', error);
		}
	};

	if (isLoading) return <p>Loading...</p>;
	if (!confessions.length) return <p>No confessions found.</p>;

	return (
		<section className="min-h-screen w-full py-24">
			<h2 className="px-5 lg:px-20">All Confessions</h2>

			<AutoFitLayout>
				{confessions.map((confession: TConfession, idx: number) => (
					<Card key={idx} className="min-w-full h-60 text-center relative py-8 px-4 hover:-translate-y-2 hover:border-blue-400/30">
						<div className="flex items-center justify-start gap-x-2 ">
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
								<p className="text-xs text-foreground text-left">{confession.author}</p>
								<p className="text-xs text-foreground/60 text-left">{dayjs(confession.createdAt).fromNow(true)}</p>
							</div>
						</div>

						<p className="text-foreground/80 my-5 text-left text-[14px]">{confession.content}</p>

						<CardFooter className="absolute gap-x-4 p-0 justify-end bottom-4 right-4">
							<CommentButton confession={confession} />
							<LikeButton confession={confession} onClick={() => handleLikeConfession(confession?._id)} />
						</CardFooter>
					</Card>
				))}
			</AutoFitLayout>
			<PaginationComponent pageSize={per_page} currentPage={page} itemCount={confessions.length} />
		</section>
	);
}

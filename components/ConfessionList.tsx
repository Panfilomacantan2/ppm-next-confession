'use client';

import { useCallback, useEffect, useState } from 'react';
import { Card, CardFooter } from '@/components/ui/card';
import { getAllConfessions, likeConfession } from '@/lib/actions/confession.actions';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';
import LikeButton from '@/components/LikeButton';
import CommentButton from '@/components/CommentButton';
import AutoFitLayout from '@/components/AutoFitLayout';
import PaginationComponent from '@/components/Pagination';
import { TConfession } from '@/lib/types';

dayjs.extend(relativeTime);

interface ConfessionListProps {
	searchParams: { [key: string]: string };
}

export default function ConfessionList({ searchParams }: ConfessionListProps) {
	const [confessions, setConfessions] = useState<TConfession[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const fetchedConfessions: TConfession[] = (await getAllConfessions()) as TConfession[];
				setConfessions(fetchedConfessions.reverse());

				setLoading(false);
			} catch (error) {
				console.error('Failed to fetch confessions:', error);
				// Handle error (e.g., set an error state and display a message to the user)
			}
		};

		fetchData();
	}, []);

	const per_page = parseInt(searchParams['per_page']) || 12;
	const page = parseInt(searchParams['page']) || 1;
	const start = (page - 1) * per_page;
	const end = start + per_page;
	const reversedConfession = confessions.reverse();
	const entries = reversedConfession.slice(start, end);

	const handleLikeConfession = useCallback(async (id: string) => {
		try {
			await likeConfession(id);
			setConfessions((prevConfessions) => prevConfessions.map((confession) => (confession._id?.toString() === id ? { ...confession, likes: confession.likes + 1 } : confession)));
		} catch (error) {
			console.error('Failed to like confession:', error);
		}
	}, []);

	if (loading) return 'Loading...';


	return (
		<section className='min-h-screen w-full'>
			<AutoFitLayout>
				{entries.length > 0 ? (
					entries.map((confession, idx) => (
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
									<p className="text-xs text-foreground/60 text-left">{dayjs(confession.createdAt).fromNow()}</p>
								</div>
							</div>

							<p className="text-foreground/80 my-5 text-left text-[14px]">{confession.content}</p>

							<CardFooter className="absolute gap-x-4 p-0 justify-end bottom-4 right-4">
								<CommentButton confession={confession} />
								<LikeButton confession={confession} onClick={() => handleLikeConfession(confession?._id?.toString() ?? '')} />
							</CardFooter>
						</Card>
					))
				) : (
					<p>No confessions available.</p>
				)}
			</AutoFitLayout>
			<PaginationComponent pageSize={per_page} currentPage={page} itemCount={confessions.length} />
		</section>
	);
}

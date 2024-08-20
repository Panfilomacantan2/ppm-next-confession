'use client';

import { deleteMyConfession, getUserConfessions } from '@/lib/actions/confession.actions';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import { Card, CardFooter } from './ui/card';
import Image from 'next/image';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import AutoFitLayout from './AutoFitLayout';
import DeleteDialog from './DeleteDialog';
import { toast } from './ui/use-toast';
import Link from 'next/link';
import EditDialog from './EditDialog';

dayjs.extend(relativeTime);

const MyConfessionLists = () => {
	const { isLoaded, isSignedIn, user } = useUser();
	const [confessions, setConfessions] = useState<any[]>([]);

	useEffect(() => {
		const fetchConfessions = async () => {
			if (user?.id) {
				try {
					const data = await getUserConfessions(user.id);
					setConfessions(data?.reverse() || []);
				} catch (error) {
					console.error('Failed to fetch confessions', error);
				}
			}
		};

		if (isSignedIn && user?.id) {
			fetchConfessions();
		}
	}, [isSignedIn, user?.id]);

	const deleteConfession = async (id: string) => {
		try {
			await deleteMyConfession(id);

			// Add your logic to delete the confession here
			toast({
				title: 'Confession deleted',
				description: 'Your confession has been deleted successfully!',
			});

			setConfessions((prevConfessions) => prevConfessions.filter((confession) => confession._id !== id));
		} catch (error) {
			toast({
				title: 'Error',
				description: 'Failed to delete confession!',
			});
		}
	};

	if (!isLoaded) return <p>Loading...</p>;
	if (!isSignedIn) return <p>Please sign in to view confessions.</p>;

	return (
		<section className="w-full min-h-screen py-28">
			<h2 className="px-5 lg:px-20">My Confessions</h2>
			<AutoFitLayout>
				{confessions.map((confession: any) => (
					<Card key={confession._id} className="min-w-full h-60 text-center relative py-8 px-4 hover:-translate-y-2 hover:border-blue-400/30">
						<div className="flex items-center justify-start gap-x-2">
							<div className="h-9 w-9">
								{!confession?.avatar ? (
									<div className="animate-pulse">
										<div className="rounded-full bg-slate-200 dark:bg-slate-700 h-9 w-9"></div>
									</div>
								) : (
									<div className="h-9 w-9 rounded-full overflow-hidden">
										<Image src={confession?.avatar} width={22} height={22} alt={confession?.author} className="w-full h-full object-cover" />
									</div>
								)}
							</div>

							<div className="flex flex-col justify-start items-center">
								<p className="text-xs text-foreground text-left">{confession?.author}</p>
								<p className="text-xs text-foreground/60 text-left">{dayjs(confession?.createdAt).fromNow()}</p>
							</div>
						</div>

						<p className="text-foreground/80 my-5 text-left text-[14px]">{confession?.content}</p>

						<CardFooter className="absolute p-0 justify-end bottom-4 right-4">
							<div className="flex gap-x-3 right-0">
								<DeleteDialog confessionId={confession._id} onClick={deleteConfession} />
								<div className="bg-sky-100/90 hover:bg-sky-100/80 p-1 rounded-full">
									<EditDialog confessionId={confession._id} />
								</div>
							</div>
						</CardFooter>
					</Card>
				))}
			</AutoFitLayout>
		</section>
	);
};

export default MyConfessionLists;

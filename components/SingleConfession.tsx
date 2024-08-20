import React, { useEffect, useState } from 'react';
import { TConfession } from '@/lib/types';
import CardConfession from './CardConfession';

interface SingleConfessionPageProps {
	id: string;
	user: string;
}

const SingleConfessionPage = ({ id, user }: SingleConfessionPageProps) => {
	const [confessions, setConfessions] = useState<TConfession | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`/api/confession/comments?id=${id}`, {
					cache: 'no-store',
				});
				const data = await response.json();

				setConfessions(data[0] || null);
				setLoading(false);

				// console.log(data);
			} catch (error) {
				console.error('Failed to fetch confession:', error);
				// Handle error (e.g., set an error state and display a message to the user)
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [id, confessions?.comments]);

	if (loading) return 'Loading...';

	return confessions ? <CardConfession confession={confessions} user={user} /> : null;
};

export default SingleConfessionPage;

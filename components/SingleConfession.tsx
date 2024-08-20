import React, { useEffect, useState } from 'react';
import { getSingleConfession } from '@/lib/actions/confession.actions';
import { TConfession } from '@/lib/types';
import CardConfession from './CardConfession';

interface SingleConfessionPageProps {
	id: string;
	user: string;
}

const SingleConfessionPage = ({ id, user }: SingleConfessionPageProps) => {
	const [confessions, setConfessions] = useState<TConfession | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const fetchedConfession = (await getSingleConfession(id)) as unknown as TConfession;
        setConfessions(fetchedConfession)
			} catch (error) {
				console.error('Failed to fetch confession:', error);
				// Handle error (e.g., set an error state and display a message to the user)
			}
		};

		fetchData();
	}, [id]);


	return confessions ? <CardConfession confession={confessions} user={user} /> : null;
};

export default SingleConfessionPage;

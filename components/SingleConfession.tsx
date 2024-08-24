
import CardConfession from './CardConfession';
import { useConfessionSWR } from '@/lib/helper';

interface SingleConfessionPageProps {
	id: string;
	user: string;
}

const SingleConfessionPage = ({ id, user }: SingleConfessionPageProps) => {
	const { data: confessions, error, isLoading } = useConfessionSWR(`/api/confession/comments?id=${id}`);

	if (error) return 'Failed to load confession';
	if (isLoading) return 'Loading...';

	return 
};

export default SingleConfessionPage;

import UserWrapper from '@/components/UserWrapper';

const ConfessionPage = ({ params }: { params: { id: string } }) => {
	return (
		<section className="min-h-screen w-full flex justify-center items-center py-24">
			<UserWrapper id={params.id} />
		</section>
	);
};

export default ConfessionPage;

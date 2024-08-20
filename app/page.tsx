import ConfessionList from '@/components/ConfessionList';
interface HomeProps {
	searchParams: { [key: string]: string };
}

export default function Home({ searchParams }: HomeProps) {
	return (
		<section className="flex min-h-screen items-center justify-center w-full py-24">
			<ConfessionList searchParams={searchParams} />
		</section>
	);
}

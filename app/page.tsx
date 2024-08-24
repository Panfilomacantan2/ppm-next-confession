import ConfessionList from "@/components/ConfessionList";
interface HomeProps {
  searchParams: { [key: string]: string };
}

export default function Home({ searchParams }: HomeProps) {
  return <ConfessionList searchParams={searchParams} />;
}

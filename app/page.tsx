import ConfessionList from "@/components/ConfessionList";
interface HomeProps {
  searchParams: { [key: string]: string };
}

export const dynamic = "force-dynamic";

export default function Home({ searchParams }: HomeProps) {
  return (
    <>
      <ConfessionList searchParams={searchParams} />;
    </>
  );
}

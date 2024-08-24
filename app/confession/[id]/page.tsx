"use client";

import CardConfession from "@/components/CardConfession";
import { useConfessionSWR } from "@/lib/helper";
import { useUser } from "@clerk/nextjs";

const ConfessionPage = ({ params }: { params: { id: string } }) => {
  const { user } = useUser();
  const {
    data: confessions,
    error,
    isLoading,
  } = useConfessionSWR(`/api/confession/${params.id}`);

  console.log(confessions);

  // Loading state
  if (isLoading) return <p>Loading...</p>;

  // Error handling
  if (error) return <p>Failed to load confession: {error.message}</p>;

  // No data found
  if (!confessions) return <p>No confession found for ID: {params.id}</p>;

  return (
    <section className="flex min-h-screen w-full items-center justify-center px-3 py-24">
      <CardConfession
        confession={confessions}
        user={user}
        confessionId={params.id}
      />
    </section>
  );
};

export default ConfessionPage;

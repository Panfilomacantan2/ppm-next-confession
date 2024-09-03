"use client"

import ConfessionList from "@/components/ConfessionList";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
interface HomeProps {
  searchParams: { [key: string]: string };
}

export const dynamic = "force-dynamic";

export default function Home({ searchParams }: HomeProps) {
  const { user } = useUser();

  if (!user?.id) {
    redirect("/sign-in");
  }


  return (
    <>
      <ConfessionList searchParams={searchParams} />
    </>
  );
}

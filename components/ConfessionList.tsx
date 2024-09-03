"use client";

import { Card, CardFooter } from "@/components/ui/card";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import LikeButton from "@/components/LikeButton";
import CommentButton from "@/components/CommentButton";
import AutoFitLayout from "@/components/AutoFitLayout";
import PaginationComponent from "@/components/Pagination";
import { TConfession } from "@/lib/types";
import {  useConfessionSWR } from "@/lib/helper";
import { mutate } from "swr";
import { useUser } from "@clerk/nextjs";
import Loading from "./Loading";
import ConfessionContent from "./ConfessionContent";

dayjs.extend(relativeTime);

interface ConfessionListProps {
  searchParams: { [key: string]: string };
}

export default function ConfessionList({ searchParams }: ConfessionListProps) {
  const { user } = useUser();
  const {
    data: confessions,
    error,
    isLoading,
  } = useConfessionSWR("/api/confession", {
    onSuccess: (data: any) => {
      data.sort(
        (a: TConfession, b: TConfession) =>
          dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix(),
      );
    },
    refreshInterval: 1000,
  });

  const per_page = parseInt(searchParams["per_page"]) || 12;
  const page = parseInt(searchParams["page"]) || 1;
  const start = (page - 1) * per_page;
  const end = start + per_page;
  const entries = confessions?.slice(start, end);

  const handleLikeConfession = async (id: string) => {
    if (!user?.id) {
      console.error("User is not logged in.");
      return;
    }

    try {
      const response = await fetch(`/api/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ confessionId: id, userId: user.id }),
      });

    

      if (!response.ok) throw new Error("Failed to like the confession.");

      await mutate(`/api/confession`);
    } catch (error) {
      console.error("Failed to like confession:", error);
    }
  };

  if (isLoading) return <Loading />;

  if (error) return <p>Failed to load confessions.</p>;
  if (!confessions?.length) return <p>No confessions yet</p>;

  return (
    <section className="min-h-screen w-full py-28">
      <h2 className="px-5 lg:px-20">All Confessions</h2>

      <AutoFitLayout className="lg:py-10">
        {entries.map((confession: TConfession, idx: number) => (
          <Card
            key={idx}
            className="relative h-64 min-w-full px-4 py-8 text-center hover:-translate-y-[2px] hover:border-blue-400/30"
          >
            <div className="flex items-center justify-start gap-x-2">
              <div className="h-9 w-9">
                {!confession.avatar ? (
                  <div className="animate-pulse">
                    <div className="h-9 w-9 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                  </div>
                ) : (
                  <div className="h-9 w-9 overflow-hidden rounded-full">
                    <Image
                      src={confession.avatar}
                      width={22}
                      height={22}
                      alt={confession.author || "Confession author"}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="items-centers flex flex-col justify-start">
                <p className="text-left text-xs capitalize text-foreground">
                  {confession.author || "Anonymous"}
                </p>
                <p className="text-left text-xs text-foreground/60">
                  {dayjs(confession.createdAt).fromNow()}
                </p>
              </div>
            </div>

            <p className="my-5 text-left text-[14px] text-foreground/80">
                <ConfessionContent content={confession.content} id={confession._id} />
            </p>

            <CardFooter className="absolute bottom-4 right-4 justify-end gap-x-4 p-0">
              <CommentButton confession={confession} />
              <LikeButton
                confession={confession}
                onClick={() => handleLikeConfession(confession._id)}
              />
            </CardFooter>
          </Card>
        ))}
      </AutoFitLayout>
      <PaginationComponent
        pageSize={per_page}
        currentPage={page}
        itemCount={confessions.length}
      />
    </section>
  );
}

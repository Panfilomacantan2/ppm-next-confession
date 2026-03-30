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
import { useConfessionSWR } from "@/lib/helper";
import { mutate } from "swr";
import { useUser } from "@clerk/nextjs";
import Loading from "./Loading";
import ConfessionContent from "./ConfessionContent";
import EmptyConfession from "./EmptyConfession";
import { usePageLoading } from "@/lib/LoadingContext";
import { useEffect } from "react";

import AnonymousImg from "@/public/icons/anonymous.png";
import { Separator } from "./ui/separator";

dayjs.extend(relativeTime);

interface ConfessionListProps {
  searchParams: { [key: string]: string };
}

export default function ConfessionList({ searchParams }: ConfessionListProps) {
  const { user } = useUser();
  const { setIsPageLoading } = usePageLoading();
  const {
    data: confessions,
    error,
    isLoading,
  } = useConfessionSWR("/api/confession", {
    onSuccess: (data: TConfession[]) => {
      data.sort(
        (a: TConfession, b: TConfession) =>
          dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix(),
      );
    },
    refreshInterval: 3000,
  });

  const per_page = parseInt(searchParams["per_page"]) || 12;

  useEffect(() => {
    setIsPageLoading(isLoading);
  }, [isLoading]);

  const page = parseInt(searchParams["page"]) || 1;
  const start = (page - 1) * per_page;
  const end = start + per_page;
  const entries = confessions?.slice(start, end);

  const handleClick = async (confession: TConfession) => {
    if (!user?.id) {
      alert("Please sign in to like confessions");
      return;
    }

    const confessionId = confession._id;
    const userId = user.id;

    try {
      await mutate(
        "/api/confession", // Important: gamitin ang key ng confessions
        async (currentData: TConfession[] | undefined) => {
          if (!currentData) return [];

          const updatedData = currentData.map((item) => {
            if (item._id === confessionId) {
              const currentlyLiked = item.isLiked ?? false; // gagamitin natin ito

              return {
                ...item,
                isLiked: !currentlyLiked, // toggle
                likeCount: currentlyLiked
                  ? Number(item.likeCount || 0) - 1
                  : Number(item.likeCount || 0) + 1,
              };
            }
            return item;
          });

          // Tawagin ang API para sa tunay na like/unlike
          await fetch("/api/like", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ confessionId, userId }),
          });

          return updatedData;
        },
        {
          optimisticData: (currentData: TConfession[] | undefined) => {
            if (!currentData) return [];

            return currentData.map((item) => {
              if (item._id === confessionId) {
                const currentlyLiked = item.isLiked ?? false;

                return {
                  ...item,
                  isLiked: !currentlyLiked,
                  likeCount: currentlyLiked
                    ? Number(item.likeCount || 0) - 1
                    : Number(item.likeCount || 0) + 1,
                };
              }
              return item;
            });
          },
          rollbackOnError: true,
          revalidate: true, // re-fetch after real API call
        },
      );
    } catch (error) {
      console.error("Like error:", error);
    }
  };

  if (isLoading) return <Loading />;

  if (error) return <p>Failed to load confessions.</p>;
  if (!confessions?.length) return <EmptyConfession />;

  return (
    <section className="mx-auto min-h-screen max-w-7xl py-28">
      {/* Header */}
      <div className="px-5 pb-2 lg:px-20">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🕯️</span>
          <h2 className="text-xl font-semibold tracking-tight">Confessions</h2>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Anonymous thoughts, shared with the world.
        </p>
      </div>

      <AutoFitLayout className="lg:py-10">
        {entries.map((confession: TConfession, idx: number) => (
          <Card
            key={idx}
            className="group relative flex h-72 min-w-full flex-col justify-between overflow-hidden border border-border/60 px-5 py-5 shadow-sm transition-shadow hover:shadow-md"
          >
            {/* Subtle top accent line */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-rose-400/60 via-pink-300/40 to-transparent" />

            {/* Author row */}
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 shrink-0">
                {!confession.avatar ? (
                  <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />
                ) : (
                  <div className="h-9 w-9 overflow-hidden rounded-full ring-2 ring-border">
                    <Image
                      src={
                        confession.author === "Anonymous"
                          ? AnonymousImg
                          : confession.avatar
                      }
                      width={36}
                      height={36}
                      alt={confession.author || "Confession author"}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-medium capitalize leading-tight">
                  {confession.author || "Anonymous"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {confession.feeling ?? "😊 Happy"} ·{" "}
                  {dayjs(confession.createdAt).fromNow()}
                </span>
              </div>
            </div>

            {/* Content */}
            <p className="flex-1 pt-4 text-left text-sm leading-relaxed text-foreground/80">
              <ConfessionContent
                content={confession.content}
                id={confession._id}
              />
            </p>

            {/* Footer */}
            <CardFooter className="mt-3 flex items-center justify-end gap-3 border-t border-border/40 p-0 pt-3">
              <CommentButton confession={confession} />
              <Separator orientation="vertical" className="h-4" />
              <LikeButton
                confession={confession}
                onClick={() => handleClick(confession)}
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

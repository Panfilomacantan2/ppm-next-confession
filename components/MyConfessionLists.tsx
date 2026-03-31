"use client";

import { deleteMyConfession } from "@/lib/actions/confession.actions";
import { useUser } from "@clerk/nextjs";
import { Card, CardFooter } from "./ui/card";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import AutoFitLayout from "./AutoFitLayout";
import DeleteDialog from "./DeleteDialog";
import EditDialog from "./EditDialog";
import { useConfessionSWR } from "@/lib/helper";
import { mutate } from "swr";
import { TConfession } from "@/lib/types";
import Loading from "./Loading";
import ConfessionContent from "./ConfessionContent";
import EmptyConfession from "./EmptyConfession";

import AnonymousImg from "@/public/icons/anonymous.png";
import { useEffect } from "react";
import { usePageLoading } from "@/lib/LoadingContext";
import { toast } from "sonner";

dayjs.extend(relativeTime);

export const dynamic = "force-dynamic";

const MyConfessionLists = () => {
  const { setIsPageLoading } = usePageLoading();

  const { isLoaded, isSignedIn, user } = useUser();
  const {
    data: confessions,
    error,
    isLoading,
  } = useConfessionSWR(`/api/my-confession?id=${user?.id}`, {
    onSuccess: (data: any) => {
      data.sort(
        (a: TConfession, b: TConfession) =>
          dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix(),
      );
    },
  });

  useEffect(() => {
    setIsPageLoading(isLoading);
  }, [isLoading]);

  const deleteConfession = async (id: string) => {
    try {
      await deleteMyConfession(id);
      await mutate(
        `/api/my-confession?id=${user?.id}`,
        async (data) => {
          return data.filter(
            (confession: TConfession) => confession._id !== id,
          );
        },
        false,
      );

      // Add your logic to delete the confession here
      toast.success("Confession deleted", {
        description: "Your confession has been deleted successfully!",
      });
    } catch (error) {
      toast.error("Error deleting confession", {
        description: "Failed to delete confession!",
      });
    }
  };

  if (!isSignedIn) return <p>Please sign in to view confessions.</p>;
  if (isLoading) return <Loading />;
  if (!confessions?.length) return <EmptyConfession />;

  return (
    <section className="mx-auto min-h-screen max-w-7xl py-28">
      {/* Header */}
      <div className="px-5 pb-2 lg:px-20">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📖</span>
          <h2 className="text-xl font-semibold tracking-tight">
            My Confessions
          </h2>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Your private thoughts, laid bare.
        </p>
      </div>

      <AutoFitLayout className="lg:py-10">
        {confessions.map((confession: any) => (
          <Card
            key={confession._id}
            className="group relative flex h-72 min-w-full flex-col justify-between overflow-hidden border border-border/60 px-5 py-5 shadow-sm transition-shadow hover:shadow-md"
          >
            {/* Accent line */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-rose-400/60 via-pink-300/40 to-transparent" />

            {/* Author row */}
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 shrink-0">
                {!confession?.avatar ? (
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
                      alt={confession?.author}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-medium capitalize leading-tight">
                  {confession?.author}
                </span>
                <span className="text-xs text-muted-foreground">
                  {confession.feeling ?? "😊 Happy"} ·{" "}
                  {dayjs(confession?.createdAt).fromNow()}
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
            <CardFooter className="mt-3 flex items-center justify-end gap-2 border-t border-border/40 p-0 pt-3">
              <DeleteDialog
                confessionId={confession._id}
                onClick={deleteConfession}
              />
              <EditDialog confession={confession} />
            </CardFooter>
          </Card>
        ))}
      </AutoFitLayout>
    </section>
  );
};

export default MyConfessionLists;

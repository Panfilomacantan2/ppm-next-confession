"use client";

import {
  deleteMyConfession,
} from "@/lib/actions/confession.actions";
import { useUser } from "@clerk/nextjs";
import { Card, CardFooter } from "./ui/card";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import AutoFitLayout from "./AutoFitLayout";
import DeleteDialog from "./DeleteDialog";
import { toast } from "./ui/use-toast";
import EditDialog from "./EditDialog";
import { useConfessionSWR } from "@/lib/helper";
import { mutate } from "swr";
import { TConfession } from "@/lib/types";
import Loading from "./Loading";
import ConfessionContent from "./ConfessionContent";
import EmptyConfession from "./EmptyConfession";

dayjs.extend(relativeTime);

export const dynamic = "force-dynamic";

const MyConfessionLists = () => {
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
      toast({
        title: "Confession deleted",
        description: "Your confession has been deleted successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete confession!",
      });
    }
  };

  if (!isSignedIn) return <p>Please sign in to view confessions.</p>;
  if (isLoading) return <Loading />;
  if (!confessions.length) return <EmptyConfession/>

  return (
    <section className="min-h-screen w-full py-28">
      <h2 className="px-5 lg:px-20">My Confessions</h2>

      <AutoFitLayout className="lg:py-10">
        {confessions.map((confession: any) => (
          <Card
            key={confession._id}
            className="relative h-64 min-w-full px-4 py-8 text-center hover:-translate-y-[2px] hover:border-blue-400/30"
          >
            <div className="flex items-center justify-start gap-x-2">
              <div className="h-9 w-9">
                {!confession?.avatar ? (
                  <div className="animate-pulse">
                    <div className="h-9 w-9 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                  </div>
                ) : (
                  <div className="h-9 w-9 overflow-hidden rounded-full">
                    <Image
                      src={confession?.avatar}
                      width={22}
                      height={22}
                      alt={confession?.author}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center justify-start">
                <p className="text-left text-xs text-foreground">
                  {confession?.author}
                </p>
                <p className="text-left text-xs text-foreground/60">
                  {dayjs(confession?.createdAt).fromNow()}
                </p>
              </div>
            </div>

            <p className="my-5 text-left text-[14px] text-foreground/80">
              <ConfessionContent
                content={confession.content}
                id={confession._id}
              />
            </p>

            <CardFooter className="absolute bottom-4 right-4 justify-end p-0">
              <div className="right-0 flex gap-x-3">
                <DeleteDialog
                  confessionId={confession._id}
                  onClick={deleteConfession}
                />
                <div className="rounded-full bg-sky-100/90 p-1 hover:bg-sky-100/80">
                  <EditDialog confession={confession} />
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </AutoFitLayout>
    </section>
  );
};

export default MyConfessionLists;

import React from "react";
import { TConfession } from "@/lib/types";
import { Card, CardFooter } from "./ui/card";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import CommentInputForm from "./CommentInput";
import CommentLists from "./CommentLists";
import CommentButton from "./CommentButton";
import LikeButton from "./LikeButton";
import { mutate } from "swr";
dayjs.extend(relativeTime);

const CardConfession = ({
  confession,
  user,
  confessionId,
}: {
  confession: TConfession;
  user: any;
  confessionId: string;
}) => {
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

  return (
    <Card className="relative min-h-[260px] w-full max-w-lg px-4 py-8 text-center hover:border-blue-400/30">
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
                alt={confession.author}
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>

        <div className="items-centers flex flex-col justify-start">
          <p className="text-left text-sm text-foreground">
            {confession.author}
          </p>
          <p className="text-left text-xs text-foreground/60">
            {dayjs(confession.createdAt).fromNow()}
          </p>
        </div>
      </div>

      <p className="my-2 min-h-20 text-left text-[14px] text-foreground">
        {confession.content}
      </p>

      <div className="mr-auto flex w-full gap-x-4 p-0 border-b border-border py-2">
        <CommentButton confession={confession} />
        <LikeButton
          confession={confession}
          onClick={() => handleLikeConfession(confession._id)}
        />
      </div>

      <CommentLists confession={confession} />

      <CardFooter className="flex items-center justify-center p-0">
        <CommentInputForm
          user={user}
          confession={confession}
          confessionId={confessionId}
        />
      </CardFooter>
    </Card>
  );
};

export default CardConfession;

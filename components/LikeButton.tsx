"use client";

import { TConfession } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { ThumbsUp } from "lucide-react";

const LikeButton = ({
  confession,
  onClick,
}: {
  confession: TConfession;
  onClick: () => void;
}) => {
  const { user } = useUser();
  return (
    <div className="flex gap-x-1">
      <ThumbsUp
        size={18}
        className={cn("cursor-pointer", {
          "text-blue-700": user && confession?.likes.includes(user.id),
        })}
        onClick={onClick}
      />

      <p className="mt-[6px] text-xs text-foreground/90">
        {confession?.likes?.length}
        {confession?.likes?.length > 1 ? " Likes" : " Like"}
      </p>
    </div>
  );
};

export default LikeButton;

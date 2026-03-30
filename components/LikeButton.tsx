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
    <div className="flex items-center justify-center">
      <ThumbsUp
        size={20}
        className={cn("cursor-pointer", {
          "text-blue-700": user && confession?.isLiked,
        })}
        onClick={onClick}
      />

      <span className="ml-1 mt-[6px] text-xs text-foreground/90">
        {Number(confession?.likeCount || 0)}{" "}
        {Number(confession?.likeCount || 0) > 1 ? "Likes" : "Like"}
      </span>
    </div>
  );
};

export default LikeButton;

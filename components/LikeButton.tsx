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

  console.log(confession);

  return (
    <div className="flex items-center justify-center">
      <ThumbsUp
        size={20}
        className={cn("cursor-pointer", {
          "text-blue-700": user && confession?.isLiked,
        })}
        onClick={onClick}
      />

      <span className="ml-1 text-sm">{confession?.likeCount || 0}</span>
    </div>
  );
};

export default LikeButton;

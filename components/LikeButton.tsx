"use client";

import { TConfession } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { ThumbsUp } from "lucide-react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "./ui/button";

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
          "text-blue-700": user && confession?.likes.includes(user.id),
        })}
        onClick={onClick}
      />
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link" className="px-1">
            {" "}
            <p className="mt-[6px] text-xs text-foreground/90">
              {confession?.likes?.length}
              {confession?.likes?.length > 1 ? " Likes" : " Like"}
            </p>
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex max-h-64 justify-between space-x-4 overflow-y-auto">
            <div className="space-y-1">
              {/* test get all the name who likes this post*/}
              {/* {confession?.likes?.map((like, idx) => (
                <div key={idx}>{like}</div>
              ))} */}
              {[
                18, // Replace with actual logic to get user names
                19, // Replace with actual logic to get user names
                20, // Replace with actual logic to get user names
              ].map((like, idx) => (
                <div key={idx}>{like}</div>
              ))}
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default LikeButton;

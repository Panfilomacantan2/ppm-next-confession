import { TComment, TConfession } from "@/lib/types";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useRef } from "react";
import { MessagesSquare } from "lucide-react";

dayjs.extend(relativeTime);

const CommentLists = ({ confession }: { confession: TConfession }) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollToBottom = () => {
      const currentContainer = container.current;
      if (currentContainer) {
        currentContainer.scrollTop = currentContainer.scrollHeight;
      }
    };

    scrollToBottom(); // Scroll to the bottom whenever the comments change
  }, [confession.comments.length]);

  if (!confession.comments.length)
    return (
      <div className="py-5 flex justify-center items-center flex-col">
         <MessagesSquare className="text-foreground/85"/>
        <p className="text-[14px] font-medium text-foreground/90">No confessions yet</p>
        <p className="text-[14px] font-light text-foreground/70">Be the first to comment.</p>
      </div>
    );

  return (
    <div
      className="scrollbar-hidden hover:scrollbar my-4 max-h-40 overflow-x-hidden overflow-y-scroll"
      ref={container}
    >
      {confession.comments.map((comment: TComment) => (
        <div
          key={comment._id}
          className="flex w-full items-start space-x-3 p-4 pb-0"
        >
          <div className="h-9 w-9 flex-shrink-0">
            {comment.avatar ? (
              <Image
                src={comment.avatar}
                alt={comment.author}
                width={35}
                height={35}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <div className="h-5 w-5 rounded-full bg-gray-300"></div>
            )}
          </div>
          <div className="max-w-full rounded-md border border-border p-2">
            <div className="flex flex-col items-start justify-start">
              <p className="text-sm font-medium capitalize text-foreground">
                {comment.author}
              </p>
              {/* Uncomment the below line if you want to show relative time */}
              {/* <span className="text-[11px] text-foreground/60">
                {dayjs(comment.createdAt).fromNow(true)}
              </span> */}
            </div>
            <p className="w-full overflow-hidden break-words text-left text-sm text-foreground/80">
              {comment.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentLists;

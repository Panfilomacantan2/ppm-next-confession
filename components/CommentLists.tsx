import { TComment, TConfession } from "@/lib/types";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRef } from "react";

dayjs.extend(relativeTime);

const CommentLists = ({ confession }: { confession: TConfession }) => {
  const latestCommentRef = useRef<HTMLDivElement>(null);

  if (latestCommentRef.current) {
    latestCommentRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }

  if(!confession.comments.length) return <p className="py-5">No confession found.</p>

  return (
    <div className="scrollbar-hidden hover:scrollbar my-4 max-h-40 overflow-x-hidden overflow-y-scroll">
      {confession.comments.map((comment: TComment, index: number) => (
        <div
          key={comment._id}
          className="flex w-full items-start space-x-3 p-4 pb-0"
          ref={
            index === confession.comments.length - 1 ? latestCommentRef : null
          }
        >
          <div className="flex-shrink-0 h-9 w-9">
            {comment.avatar ? (
              <Image
                src={comment.avatar}
                alt={comment.author}
                width={35}
                height={35}
                className="rounded-full w-full h-full object-cover"
              />
            ) : (
              <div className="h-5 w-5 rounded-full bg-gray-300"></div>
            )}
          </div>
          <div className="max-w-full rounded-md border border-border p-2">
            <div className="flex flex-col items-start justify-start">
              <p className="text-sm text-foreground capitalize">{comment.author}</p>
              {/* <span className="text-[11px] text-foreground/60">
                {dayjs(comment.createdAt).fromNow(true)}
              </span> */}
            </div>
            <p className="w-full overflow-hidden break-words text-left text-sm text-foreground/85">
              {comment.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentLists;

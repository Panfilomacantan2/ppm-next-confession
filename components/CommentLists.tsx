import { TComment, TConfession } from "@/lib/types";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useRef } from "react";
import { MessagesSquare } from "lucide-react";
import AnonymousImg from "@/public/icons/anonymous.png";
import { useLongPressModal } from "@/lib/hooks/useLongPressModal";
import DeleteCommentModal from "./delete-comment-dialog";

dayjs.extend(relativeTime);

// Set your custom short format
dayjs.locale("en", {
  relativeTime: {
    future: "%s",
    past: "%s",
    s: "Just now",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1mo",
    MM: "%dmo",
    y: "1y",
    yy: "%dy",
  },
});

const CommentLists = ({ confession }: { confession: TConfession }) => {
  const container = useRef<HTMLDivElement>(null);
  const { bind } = useLongPressModal();

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
      <div className="flex flex-col items-center justify-center py-5">
        <MessagesSquare className="text-foreground/85" />
        <p className="text-[14px] font-medium text-foreground/90">
          No comments yet
        </p>
        <p className="text-[14px] font-light text-foreground/70">
          Be the first to comment.
        </p>
      </div>
    );

  return (
    <div
      className="scrollbar-hidden shover:scrollbar my-4 max-h-40 overflow-x-hidden overflow-y-scroll"
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
                src={
                  comment.author === "Anonymous" ? AnonymousImg : comment.avatar
                }
                alt={comment.author}
                width={35}
                height={35}
                className="h-full w-full rounded-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="h-5 w-5 rounded-full bg-gray-300"></div>
            )}
          </div>

          <DeleteCommentModal>
            <div>
              <div className="max-w-full rounded-md bg-gray-300 p-2 dark:bg-gray-800">
                <div className="flex flex-col items-start justify-start">
                  <p className="text-xs font-medium capitalize text-foreground">
                    {comment.author}
                    {/* {comment.avatar} */}
                  </p>
                </div>
                <p className="w-full overflow-hidden break-words text-left text-sm text-foreground/80">
                  {comment.content}
                </p>
              </div>
              <p className="mt-1 text-left text-xs text-foreground/60">
                {dayjs(comment.createdAt).fromNow()}
              </p>
            </div>
          </DeleteCommentModal>
        </div>
      ))}
    </div>
  );
};

export default CommentLists;

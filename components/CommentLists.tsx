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
      <div className="flex flex-col items-center justify-center gap-1 py-8 text-center">
        <MessagesSquare size={28} className="text-muted-foreground/50" />
        <p className="text-sm font-medium text-foreground/80">No comments yet</p>
        <p className="text-xs text-muted-foreground">Be the first to confess a reply.</p>
      </div>
    );

  return (
    <div
      className="scrollbar-hidden my-3 max-h-52 space-y-3 overflow-x-hidden overflow-y-scroll pr-1"
      ref={container}
    >
      {confession.comments.map((comment: TComment) => (
        <div key={comment._id} className="flex w-full items-start gap-2.5 px-1">
          {/* Avatar */}
          <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-border">
            {comment.avatar ? (
              <Image
                src={comment.author === "Anonymous" ? AnonymousImg : comment.avatar}
                alt={comment.author}
                width={32}
                height={32}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="h-full w-full rounded-full bg-muted" />
            )}
          </div>

          {/* Bubble */}
          <DeleteCommentModal>
            <div className="flex flex-col">
              <div className="rounded-2xl rounded-tl-sm bg-muted px-3 py-2">
                <p className="mb-0.5 text-xs font-semibold capitalize text-foreground">
                  {comment.author}
                </p>
                <p className="break-words text-sm leading-snug text-foreground/80">
                  {comment.content}
                </p>
              </div>
              <p className="mt-1 pl-1 text-left text-[11px] text-muted-foreground">
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

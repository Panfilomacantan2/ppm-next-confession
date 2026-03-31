// components/LongPressDeleteModal.tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLongPressModal } from "@/lib/hooks/useLongPressModal";
import { mutate } from "swr";
import { toast } from "sonner";

export default function DeleteCommentModal({
  children,
  commentId,
  confessionId,
}: {
  children?: React.ReactNode;
  commentId: string;
  confessionId: string;
}) {
  const { bind, open, setOpen } = useLongPressModal();

  return (
    <>
      <div {...bind()} className="cursor-pointer select-none">
        {children}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this comment?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="destructive"
              onClick={async () => {
                try {
                  const response = await fetch(
                    `/api/confession/${confessionId}/comments/${commentId}`,
                    {
                      method: "DELETE",
                    },
                  );

                  if (!response.ok) {
                    throw new Error("Failed to delete comment");
                  }

                  console.log(response);

                  toast.success("Comment deleted", {
                    description: "Your comment has been deleted successfully.",
                  });

                  await mutate(
                    `/api/confession/${confessionId}`,
                    (data: any) => ({
                      ...data,
                      comments: data.comments.filter(
                        (comment: { _id: string }) => comment._id !== commentId,
                      ),
                    }),
                    { revalidate: false },
                  );
                } catch (error) {
                  console.error("Error deleting comment:", error);
                }

                setOpen(false);
              }}
            >
              Delete
            </Button>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

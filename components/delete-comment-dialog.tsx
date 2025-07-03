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

export default function DeleteCommentModal({
  children,
}: {
  children?: React.ReactNode;
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
              onClick={() => {
                alert("This feature is not implemented yet.");
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

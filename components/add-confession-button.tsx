import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CreateConfessionForm from "./CreateConfession";
import { Plus } from "lucide-react";

export function AddConfessionDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Plus size={15} /> Confession
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg rounded-md p-0">
        <CreateConfessionForm />
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "./ui/skeleton";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";
import { useEffect, useState } from "react";
import { TComment, TConfession } from "@/lib/types";
import { mutate } from "swr";

const formSchema = z.object({
  content: z.string().min(2, {
    message: "This cannot be empty.",
  }),
  author: z.string({
    required_error: "Please select an author to display.",
  }),
});

type FormFields = z.infer<typeof formSchema> & TComment;

export default function EditDialog({
  confession,
}: {
  confession: TConfession;
}) {
  const { isLoaded, isSignedIn, user } = useUser();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: confession.content, // Set initial content
      author: confession.author, // Set initial author
    },
  });

  async function onSubmit(values: FormFields) {
    if (!user) return;

    const confessionData = {
      user_id: user.id,
      ...values,
      avatar: user.imageUrl,
    };

    try {
      setLoading(true);

      const updateConfession = await fetch(
        `/api/my-confession/${confession._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(confessionData),
        },
      );

      if (!updateConfession.ok) {
        throw new Error("Failed to update confession");
      }

      toast({
        title: "Confession Updated",
        description: "Your confession has been successfully updated.",
      });

      await mutate(`/api/my-confession?id=${user?.id}`);
      setOpen(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Pencil
          size={18}
          className="cursor-pointer text-sm text-foreground/80 text-sky-700"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Confession</DialogTitle>
          <DialogDescription>
            Make changes to your Confession here. Click update when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            {isLoaded ? (
              <>
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author</FormLabel>
                      <Select
                        onValueChange={field.onChange} // Update the field's value
                        value={field.value} // Bind the selected value to the field's value
                        defaultValue={confession.author} // Set the default value
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Author" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {/* Always render the real author name */}
                          <SelectItem
                            value={
                              confession.author !== "Anonymous"
                                ? confession.author
                                : (user?.fullName ?? "Anonymous")
                            }
                          >
                            {confession.author !== "Anonymous"
                              ? confession.author
                              : (user?.fullName ?? "Anonymous")}
                          </SelectItem>

                          <SelectItem
                            value={
                              confession.author ===
                              (user?.username ?? "Anonymous")
                                ? (user?.fullName ?? "Anonymous")
                                : (user?.username ?? "Anonymous")
                            }
                          >
                            {confession.author ===
                            (user?.username ?? "Anonymous")
                              ? (user?.fullName ?? "Anonymous")
                              : (user?.username ?? "Anonymous")}
                          </SelectItem>

                          {/* Always render the "Anonymous" option */}
                          <SelectItem value="Anonymous">Anonymous</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confession</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Confession"
                          {...field} // Bind Textarea to form field
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : (
              <div className="space-y-2">
                <Skeleton className="h-4 w-[50px]" />
                <Skeleton className="h-9 w-full" />

                <Skeleton className="h-4 w-[80px]" />
                <Skeleton className="h-28 w-full" />
              </div>
            )}
            <DialogFooter>
              <Button type="submit">
                {loading ? (
                  <div className="flex items-center">
                    <LoaderCircle size={18} className="animate-spin" />
                    <span className="ml-1">Updating...</span>
                  </div>
                ) : (
                  "Update"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

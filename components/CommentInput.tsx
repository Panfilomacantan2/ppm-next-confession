"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "./ui/textarea";
import { TConfession } from "@/lib/types";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { mutate } from "swr";
import { useConfessionSWR } from "@/lib/helper";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import AnonymousImg from "@/public/icons/anonymous.png";
import { toast } from "sonner";

const FormSchema = z.object({
  comment: z.string().min(2, {
    message: "Comment connot be empty.",
  }),
  commentAs: z.string().min(1, {
    message: "Please select a name to display.",
  }),
});

export default function CommentInputForm({
  user,
  confession,
  confessionId,
}: {
  user: any;
  confession: TConfession;
  confessionId: string;
}) {
  //   console.log(user);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      comment: "",
      commentAs: "Anonymous",
    },
  });

  const [loading, setLoading] = useState(false);



  async function onSubmit(content: z.infer<typeof FormSchema>) {
    try {
      // Add comment to the confession
      setLoading(true);
      const response = await fetch(
        `/api/confession/${confessionId}/comments/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: confessionId,
            author: content.commentAs ?? "Anonymous",
            content: content.comment,
            avatar: user.imageUrl,
          }),
        },
      );

      console.log(response);

      setLoading(false);

      if (!response.ok) {
        throw new Error("Failed to add comment");
      }

    await mutate(`/api/confession/${confessionId}`);

      toast.success("Comment added", {
        description: "Your comment has been added successfully.",
      });
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment", {
        description:
          "There was an error adding your comment. Please try again.",
      });
    } finally {
      form.reset();
      setLoading(false);
    }
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder={`Comment as ${form.getValues("commentAs")}`}
                  className="w-full border border-border capitalize"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Comment Button and Comment As */}
        <div className="flex items-center justify-between space-x-2">
          {/* <Select  */}

          <FormField
            control={form.control}
            name="commentAs"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue="">
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Comment As" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {/* TODO: fixed the comment as */}

                    {/* <SelectItem value={user?.fullName ?? " "}>
                      {user?.fullName ?? "Anonymous"}
                    </SelectItem> */}

                    <SelectGroup>
                      <SelectItem value="Anonymous">Anonymous</SelectItem>
                      <SelectItem value={user.fullName ?? " "}>
                        {user.fullName}
                      </SelectItem>
                      <SelectItem value={user.username ?? " "}>
                        {user.username}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="">
            {loading ? (
              <div className="flex items-center">
                <LoaderCircle size={18} className="animate-spin" />
                <span className="ml-2">Adding comment...</span>
              </div>
            ) : (
              "Add Comment"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

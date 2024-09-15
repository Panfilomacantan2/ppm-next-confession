"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createConfession } from "@/lib/actions/confession.actions";
import { useUser } from "@clerk/nextjs";
import { Skeleton } from "./ui/skeleton";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "./ui/use-toast";
import { mutate } from "swr";

const formSchema = z.object({
  content: z.string().min(2, {
    message: "Content must be at least 2 characters long",
  }),

  author: z.string({
    required_error: "Please select an author to display.",
  }),
});

type FormFields = z.infer<typeof formSchema>;

let loading = false;
export default function CreateConfessionForm() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      author: "Anonymous",
    },
  });

  async function onSubmit(values: FormFields) {
    const confessionData = {
      user_id: user?.id,
      ...values,
      avatar: user?.imageUrl,
    };

    try {
      loading = true;
      await createConfession(confessionData);
      mutate("/api/confession");
      loading = false;

      // reset the form
      form.reset();

      // Delay the redirection to allow the user to see the toast | redirect to home page
      router.push("/");

      // Show a success toast
      toast({
        title: "Confession Submitted",
        description: "Your confession has been successfully submitted.",
      });
    } catch (error) {
      console.log(error);
      loading = false;
    }
  }

  return (
    <Card className="w-full md:w-[520px]">
      <CardHeader>
        <CardTitle>Create confession</CardTitle>
        <CardDescription>Create a new confession</CardDescription>
      </CardHeader>

      <CardContent>
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
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Author" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Anonymous">Anonymous</SelectItem>

                          <SelectItem value={user?.fullName ?? " "}>
                            {user?.fullName ?? "Anonymous"}
                          </SelectItem>

                          <SelectItem value={user?.username ?? " "}>
                            {user?.username ?? "Anonymous"}
                          </SelectItem>
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
                        <Textarea placeholder="Confession" {...field} />
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

            <div className="flex">
              <Button type="submit" className="btn ml-auto">
                {loading ? (
                  <div className="flex items-center">
                    <LoaderCircle size={18} className="animate-spin" />
                    <span className="ml-1">Creating...</span>
                  </div>
                ) : (
                  "Create"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

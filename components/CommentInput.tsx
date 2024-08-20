'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { Textarea } from './ui/textarea';
import { addCommentToConfession, getAllConfessions } from '@/lib/actions/confession.actions';
import { TConfession } from '@/lib/types';

const FormSchema = z.object({
    comment: z.string().min(2, {
        message: 'Comment must be at least 2 characters.',
    }),
});

export default function CommentInputForm({ user, confession }: { user: string; confession: TConfession }) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            comment: '',
        },
    });

    async function onSubmit(content: z.infer<typeof FormSchema>) {
        try {
            await addCommentToConfession(confession?._id?.toString() ?? "", user, content?.comment, confession?.avatar);
            console.log('Comment added successfully');

            toast({
                title: 'Comment added',
                description: 'Your comment has been added successfully.',
            });

          
        } catch (error) {
            console.error('Error adding comment:', error);
            toast({
                title: 'Failed to add comment',
                description: 'There was an error adding your comment. Please try again.',
            });
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
                                <Textarea placeholder={`Comment as ${user}`} className="w-full" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="float-right">
                    Submit
                </Button>
            </form>
        </Form>
    );
}

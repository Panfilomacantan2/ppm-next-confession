'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import { Textarea } from './ui/textarea';
import { TConfession } from '@/lib/types';
import { useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { mutate } from 'swr';
import { useConfessionSWR } from '@/lib/helper';

const FormSchema = z.object({
	comment: z.string().min(2, {
		message: 'Comment must be at least 2 characters.',
	}),
});

export default function CommentInputForm({ user, confession, confessionId }: { user: any; confession: TConfession; confessionId: string }) {
	console.log(user);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			comment: '',
		},
	});

	const [loading, setLoading] = useState(false);

	async function onSubmit(content: z.infer<typeof FormSchema>) {
		try {
			// Add comment to the confession
			setLoading(true);
			const addComment = await fetch(`/api/confession/${confessionId}/comments/add`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					_id: confessionId,
					author: user.fullName,
					content: content.comment,
					avatar: user.imageUrl,
				}),
			});

			setLoading(false);

			if (!addComment.ok) {
				throw new Error('Failed to add comment');
			}

			await mutate(`/api/confession/${confessionId}`);

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
								<Textarea placeholder={`Comment as ${user.fullName}`} className="w-full" {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="float-right">
					{loading ? (
						<div className="flex items-center">
							<LoaderCircle size={18} className="animate-spin" />
							<span className="ml-2">Adding Comment</span>
						</div>
					) : (
						'Add Comment'
					)}
				</Button>
			</form>
		</Form>
	);
}

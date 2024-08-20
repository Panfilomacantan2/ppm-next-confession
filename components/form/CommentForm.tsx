'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { toast } from '../ui/use-toast';

const FormSchema = z.object({
	comment: z.string().min(1, { message: 'Comment must not be empty.' }).max(160, { message: 'Comment must not be longer than 30 characters.' }),
});

export function CommentForm({ author, confessionId, accId }: { author: string; confessionId: string; accId: string }) {
	const router = useRouter();
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			comment: '',
		},
	});

	const onSubmit = async (data: z.infer<typeof FormSchema>) => {
		// Todo: Add a current user with mongoose id

		toast({
			title: 'Notification',
			description: 'Your comment has been added successfully',
		});

		form.reset();
		router.refresh();
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-[460px] space-y-3">
				<FormField
					control={form.control}
					name="comment"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Comment</FormLabel>
							<FormControl>
								<Textarea placeholder={`Add a comment to ${author} confession.`} className="resize-none" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className="float-right" type="submit">
					Submit
				</Button>
			</form>
		</Form>
	);
}

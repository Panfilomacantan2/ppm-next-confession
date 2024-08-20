'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Pencil } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createConfession, getSingleConfession } from '@/lib/actions/confession.actions';
import { useUser } from '@clerk/nextjs';
import { Skeleton } from './ui/skeleton';
import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from './ui/use-toast';
import { useEffect, useState } from 'react';
import { TComment } from '@/lib/types';

const formSchema = z.object({
	content: z.string().min(2, {
		message: 'Content must be at least 2 characters long',
	}),
	author: z.string({
		required_error: 'Please select an author to display.',
	}),
});

type FormFields = z.infer<typeof formSchema> & TComment;

export default function EditDialog({ confessionId }: { confessionId: string }) {
	const { isLoaded, isSignedIn, user } = useUser();
	const [confession, setConfession] = useState<FormFields | null>(null);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const form = useForm<FormFields>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			content: '',
			author: '',
		},
	});

	useEffect(() => {
		const fetchConfession = async () => {
			if (confessionId) {
				try {
					const data = (await getSingleConfession(confessionId)) as FormFields;

					if (data) {
						setConfession(data);
						form.reset({
							content: data.content,
							author: data.author,
						});
					}
				} catch (error) {
					console.error('Failed to fetch confession', error);
				}
			}
		};

		if (isSignedIn && user?.id) {
			fetchConfession();
		}
	}, [confessionId, isSignedIn, user?.id, form]);

	async function onSubmit(values: FormFields) {
		if (!user) return;

		const confessionData = { user_id: user.id, ...values, avatar: user.imageUrl };

		try {
			setLoading(true);
			await createConfession(confessionData);
			setLoading(false);

			form.reset();

			toast({
				title: 'Confession Submitted',
				description: 'Your confession has been successfully submitted.',
			});

			setTimeout(() => {
				router.push('/');
			}, 1000);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Pencil size={18} className="text-sm text-foreground/80 cursor-pointer text-sky-700" />
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit Confession</DialogTitle>
					<DialogDescription>Make changes to your Confession here. Click save when you&apos;re done.</DialogDescription>
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
											<Select onValueChange={field.onChange} value={field.value}>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select Author" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value={confession?.author || 'Anonymous'}>{confession?.author || 'Anonymous'}</SelectItem>
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
					</form>
				</Form>
				<DialogFooter>
					<Button type="submit" disabled={loading}>
						{loading ? (
							<div className="flex items-center">
								<LoaderCircle size={18} className="animate-spin" />
								<span className="ml-2">Processing...</span>
							</div>
						) : (
							'Submit'
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

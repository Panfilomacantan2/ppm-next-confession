'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '../ui/textarea';

const formSchema = z.object({
	codeName: z
		.string()
		.min(1, {
			message: 'Code Name must not be empty.',
		})
		.max(30, {
			message: 'Code Name must not be longer than 30 characters.',
		}),

	bio: z
		.string()
		.min(1, {
			message: 'Bio must not be empty.',
		})
		.max(30, {
			message: 'Code Name must not be longer than 30 characters.',
		}),
});

type FormFields = z.infer<typeof formSchema>;

// todo add a user type
export default function OnBoardingForm({ user }: any) {
	// ...
	const form = useForm<FormFields>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			codeName: '',
			bio: '',
		},
	});

	async function onSubmit(values: FormFields) {}

	return (
		<Card className="w-[350px] ">
			<CardHeader>
				<CardTitle>Set up your profile</CardTitle>
				<CardDescription>Add description about your self.</CardDescription>
			</CardHeader>

			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
						{/* codename */}
						<FormField
							control={form.control}
							name="codeName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Code Name</FormLabel>
									<FormControl>
										<Input placeholder="Code Name" {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Bio */}
						<FormField
							control={form.control}
							name="bio"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Bio</FormLabel>
									<FormControl>
										<Textarea placeholder="Bio" {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						<Button className="w-full" type="submit">
							Submit
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}

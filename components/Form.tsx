'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const formSchema = z.object({
	username: z.string().email({
		message: 'Invalid email address.',
	}),

	password: z.string().min(8, {
		message: 'Password must be at least 8 characters.',
	}),
});

type FormFields = z.infer<typeof formSchema>;

export default function ProfileForm() {
	// ...
	const form = useForm<FormFields>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	});

	function onSubmit(values: FormFields) {
		console.log(values);
	}

	return (
		<Card className="w-[350px]">
			<CardHeader>
				<CardTitle>Create project</CardTitle>
				<CardDescription>Deploy your new project in one-click.</CardDescription>
			</CardHeader>

			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input placeholder="Username" {...field} />
									</FormControl>
									{/* <FormDescription>This is your public display name.</FormDescription> */}
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input placeholder="Password" {...field} />
									</FormControl>
									{/* <FormDescription>This is your public display name.</FormDescription> */}
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

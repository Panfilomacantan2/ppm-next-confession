'use client';

import { Button } from '@/components/ui/button';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';

export default function Toast() {
	const { toast } = useToast();

	return (
		<Button
			variant="default"
			onClick={() => {
				toast({
					title: 'Scheduled: Catch up',
					description: `We'll remind you to catch up on the latest episodes of your favorite shows ${new Date().toLocaleTimeString()}`,
					action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
				});
			}}
		>
			Add to calendar
		</Button>
	);
}

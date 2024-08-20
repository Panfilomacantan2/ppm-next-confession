import React from 'react';
import { cn } from '@/lib/utils';

const AutoFitLayout = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
	<div className={cn('w-full min-h-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5 lg:p-20 ', className)} ref={ref} {...props} />
));
AutoFitLayout.displayName = 'AutoFitLayout';

export default AutoFitLayout;

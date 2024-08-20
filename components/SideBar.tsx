'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { NavLinks } from '@/constants';
import { cn } from '@/lib/utils';
import { LogOut, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function SideBar() {
	const pathname = usePathname();
	return (
		<Sheet>
			<SheetTrigger asChild>
				<div className="lg:hidden cursor-pointer">
					<Menu />
				</div>
			</SheetTrigger>
			<SheetContent side={'left'}>
				<SheetHeader>
					<Link className="mr-auto flex items-center gap-2 text-lg font-semibold" href="/">
						{/* <Image src={Logo} alt="logo" width={50} height={50} /> */}
						<span className="text-lg">
							Konpisko<span className="text-sky-500">.</span>
						</span>
					</Link>
				</SheetHeader>

				<nav className="flex flex-col space-y-2 mt-6">
					{NavLinks.map((link) => {
						const isActive = pathname === link.route;
						return (
							<Link
								key={link.route}
								className={cn('flex max-w-fit text-lg border-b-2 border-transparent transition-colors text-foreground hover:border-gray-100 dark:hover:text-sky-50 dark:hover:border-sky-800', {
									'border-sky-500 dark:border-sky-500': isActive,
								})}
								href={link.route}
							>
								<SheetClose>{link.title}</SheetClose>
							</Link>
						);
					})}
				</nav>

				<SheetFooter className="bottom-5 right-5 absolute">
					<SheetClose asChild>
						<div className="rounded-full bg-sky-100 p-2">
							<LogOut className="text-foreground/80" size={18} />
						</div>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}

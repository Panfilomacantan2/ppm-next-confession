'use client';

import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { NavLinks } from '@/constants';
import { cn } from '@/lib/utils';
import { LogOut, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CornerDownRight, CirclePlus, MessageCircleMore } from 'lucide-react';
import SignOutButton from './SignOutButton';

export function SideBar() {
	const pathname = usePathname();
	const icons = [<CornerDownRight size={18} />, <CirclePlus size={18} />, <MessageCircleMore size={18} />];

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

				<nav className="flex flex-col space-y-4 mt-6">
					{NavLinks.map((link, idx) => {
						const isActive = pathname === link.route;
						return (
							<div className="flex gap-x-2" key={link.route}>
								<span
									className={cn('text-gray-500/100 dark:text-gray-100/90 bg-transparent p-[4px] rounded-lg', {
										grayscale: !isActive,
										'text-gray-100/90': isActive,

										// different bg color in every icon

										'bg-sky-500': link.route === '/' && isActive,
										'bg-pink-500': link.route === '/create' && isActive,
										'bg-violet-500': link.route === '/my-confession' && isActive,
									})}
								>
									{icons[idx]}
								</span>

								<Link 
									className={cn(' flex max-w-fit font-medium text-[16px]  transition-colors text-foreground/80 hover:text-foreground/100', {
										'text-foreground/100': isActive,
									})}
									href={link.route}
								>
									<SheetClose className='active:border-0 active:outline-0 border-0 focus:border-0 focus:outline-0'>{link.title}</SheetClose>
									{/* {link.title} */}
								</Link>
							</div>
						);
					})}
				</nav>

				<SheetFooter className="bottom-5 right-5 absolute">
					<SheetClose asChild>
						<SignOutButton/>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}

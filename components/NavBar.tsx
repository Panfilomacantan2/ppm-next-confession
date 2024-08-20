'use client';

import Link from 'next/link';
import { AvatarDemo } from './Avatar';
import { NavLinks } from '@/constants';
import ModeToggle from './ToggleDarkMode';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { SignOutButton, SignedIn, UserButton, useUser } from '@clerk/nextjs';
import { LogOut } from 'lucide-react';
import { SideBar } from './SideBar';

export default function NavBar() {
	const pathname = usePathname();
	const router = useRouter();
	const { isLoaded } = useUser();

	return (
		<nav className="fixed inset-x-0 top-0 z-50 bg-white shadow lg:px-20 dark:bg-gray-950">
			<div className="container px-4 md:px-6">
				<div className="flex h-16 items-center">
					<Link className="mr-auto flex items-center gap-2 text-lg font-semibold" href="/">
						{/* <Image src={Logo} alt="logo" width={50} height={50} /> */}
						<span className="text-lg">
							Konpisko<span className="text-sky-500">.</span>
						</span>
					</Link>
					<nav className="ml-auto flex items-center space-x-4">
						{NavLinks.map((link) => {
							const isActive = pathname === link.route;
							return (
								<Link
									key={link.route}
									className={cn(
										'hidden lg:flex font-medium text-sm border-b-2 border-transparent transition-colors hover:text-gray-900 hover:border-gray-100 dark:hover:text-sky-50 dark:hover:border-sky-800',
										{
											'border-sky-500 dark:border-sky-500': isActive,
										},
									)}
									href={link.route}
								>
									{link.title}
								</Link>
							);
						})}

						<div className="h-8 w-8">
							<SignedIn>
								{!isLoaded ? (
									<div className="animate-pulse">
										<div className="rounded-full bg-slate-200 dark:bg-slate-700  h-8 w-8"></div>
									</div>
								) : (
									<UserButton afterSignOutUrl="/sign-in" />
								)}
							</SignedIn>
						</div>

						<ModeToggle />

						<SideBar />
					</nav>
				</div>
			</div>
		</nav>
	);
}

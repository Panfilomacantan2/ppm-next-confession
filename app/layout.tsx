import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import NavBar from '@/components/NavBar';
import { ThemeProvider } from '@/components/ThemeProvider';
import Footer from '@/components/Footer';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<html lang="en" suppressHydrationWarning>
				<head />
				<body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
						<NavBar />
						<main className="min-h-screen flex justify-center items-center">{children}</main>
						<Toaster />
						<Footer />
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}

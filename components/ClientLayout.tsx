'use client';

import { useUser } from '@clerk/nextjs';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import React from 'react';
import { usePageLoading } from '@/lib/LoadingContext';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
	const { isLoaded, isSignedIn } = useUser();
	const { isPageLoading } = usePageLoading();

	if (!isLoaded) return null;

	return (
		<>
			{isSignedIn && <NavBar />}
			{children}
			{isSignedIn && !isPageLoading && <Footer />}
		</>
	);
};

export default ClientLayout;

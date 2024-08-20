// components/ClientLayout.js
'use client';

import { useUser } from '@clerk/nextjs';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import React from 'react';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
	const { isLoaded, isSignedIn } = useUser();

	if (!isLoaded) return null;

	return (
		<>
			{isSignedIn && <NavBar />}
			{children}
			{isSignedIn && <Footer />}
		</>
	);
};

export default ClientLayout;

import React from 'react';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import OnBoardingForm from '@/components/form/OnBoardingForm';

const OnBoardingPage = async () => {
	const user = await currentUser();

	if (!user) return null;

	// todo check if the user has already onboarded and redirect to the home page

	// if(userInfo?.onBoarded) redirect('/');

	return <OnBoardingForm user={user?.id} />;
};

export default OnBoardingPage;

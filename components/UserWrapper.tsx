'use client';

import React from 'react';
import { useUser } from '@clerk/nextjs';
import SingleConfessionPage from './SingleConfession';

const UserWrapper = ({ id }: { id: string }) => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) return <p>Loading...</p>;
  if (!isSignedIn) return <p>Please sign in to comment.</p>;

  return <SingleConfessionPage id={id} user={user?.fullName || 'Anonymous'} />;
};

export default UserWrapper;

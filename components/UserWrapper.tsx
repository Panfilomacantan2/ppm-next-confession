'use client';

import React from 'react';
import { useUser } from '@clerk/nextjs';
import SingleConfessionPage from './SingleConfession';

const UserWrapper = ({ id }: { id: string }) => {
 

  return <SingleConfessionPage id={id} user={user?.fullName || 'Anonymous'} />;
};

export default UserWrapper;

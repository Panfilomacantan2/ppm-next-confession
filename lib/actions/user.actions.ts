'use server';

import { connectToDB } from '../mongoose';
import User from '../models/user.model';
import { revalidatePath } from 'next/cache';

export async function completeOnboarding({
  clerkId,
  name,
  email,
  avatar,
  username,
}: {
  clerkId: string;
  name: string;
  email: string;
  avatar?: string;
  username?: string;
}) {
  await connectToDB();

  await User.findOneAndUpdate(
    { clerkId },
    {
      clerkId,
      name,
      email,
      avatar: avatar ?? null,
      username: username ?? undefined,
      onboarded: true,
    },
    { upsert: true, new: true },
  );

  revalidatePath('/');
}

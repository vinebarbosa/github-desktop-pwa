'use server';

import { revalidateTag } from 'next/cache';

import { auth } from '@/modules/auth';

export async function revalidateUserRepositoriesAction() {
  const session = await auth();
  const username = session?.user?.id as string;
  revalidateTag(`repos-${username}`);
}

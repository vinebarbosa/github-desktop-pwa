'use server';

import { signInFactory } from '../factories/sign-in-factory';

export async function signInAction(formData: FormData) {
  return await signInFactory(formData);
}

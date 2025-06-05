'use server'

import { signInFactory } from '../utils/sign-in-factory'

export async function signInAction(formData: FormData) {
  return await signInFactory(formData)
}

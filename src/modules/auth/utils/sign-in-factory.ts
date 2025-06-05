'use server'

import { signIn } from '@/modules/auth'
import { ROUTES } from '@/modules/shared/routes'

export async function signInFactory(formData?: FormData) {
  const isTest = process.env.NEXT_PUBLIC_MODE === 'test'

  if (isTest) {
    const password = formData?.get('password')?.toString() ?? ''

    return await signIn('credentials', {
      password,
      redirect: true,
      redirectTo: ROUTES.repositories,
    })
  }

  return await signIn('github', {
    redirect: true,
    redirectTo: ROUTES.repositories,
  })
}

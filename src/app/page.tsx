
import { signInAction } from '@/modules/auth/server-actions/sign-in-action'
import { Button } from '@/modules/shared/components/ui/button'

export default function SignInPage() {
  const isTest = process.env.NEXT_PUBLIC_MODE === 'test'

  return (
    <form
      className="min-h-screen flex flex-col items-center justify-center gap-4"
      action={signInAction}
    >
      <span className="text-sm font-medium tracking-[1%]">Entra com sua conta do Github</span>

      {isTest && (
        <input name="password" type="password" placeholder="Senha" required />
      )}

      <Button type='submit'>Entrar</Button>
    </form>
  )
}

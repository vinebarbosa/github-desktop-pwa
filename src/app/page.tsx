import { Button } from "@/components/button";

import { signIn } from "@/lib/auth"
import { ROUTES } from "@/lib/routes";

export default function SignInPage() {
  return (
    <form className="min-h-screen flex flex-col items-center justify-center gap-4"
      action={async () => {
        "use server"
        await signIn("github", { redirect: true, redirectTo: ROUTES.followingUsers })
      }}
    >
      <span className="text-sm font-medium tracking-[1%]">Entra com sua conta do Github</span>
      <Button>
        Entrar
      </Button>
    </form>
  )
}

import { Avatar, AvatarFallback, AvatarImage } from '@/components/avatar';
import { Button } from '@/components/button';
import { getUser } from '@/http/get-user';
import { auth, signOut } from '@/lib/auth';
import { ROUTES } from '@/lib/routes';

export default async function ProfilePage() {
  const session = await auth();
  const authorizationToken = session?.accessToken

  const user = await getUser({ authorizationToken })

  const avatarUrl = user.avatar_url
  const avatarFallback = user?.name.charAt(0).toUpperCase()
  const username = user.name

  return (
    <form
      className="flex flex-1 h-full items-center justify-center flex-col gap-6"
      action={async () => {
        'use server';
        await signOut({ redirectTo: ROUTES.signIn });
      }}
    >
      <Avatar className='size-32 text-6xl'>
        {avatarUrl && <AvatarImage src={avatarUrl} />}
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>

      <span className="font-medium text-2xl leading-5 tracking-[1%]">{username}</span>

      <Button className="mt-3">Sair</Button>
    </form>
  );
}

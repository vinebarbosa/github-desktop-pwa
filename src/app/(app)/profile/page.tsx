import { Avatar, AvatarFallback, AvatarImage } from '@/components/avatar';
import { Button } from '@/components/button';
import { auth, signOut } from '@/lib/auth';
import { ROUTES } from '@/lib/routes';

export default async function ProfilePage() {
  const session = await auth();

  const avatar = session?.user?.image;
  const username = session?.user?.name;
  const usernameFallback = username?.charAt(0);

  return (
    <form
      className="flex flex-1 h-full items-center justify-center flex-col gap-6"
      action={async () => {
        'use server';
        await signOut({ redirectTo: ROUTES.signIn });
      }}
    >
      <Avatar className='size-32'>
        {avatar && <AvatarImage src={avatar} />}
        <AvatarFallback>{usernameFallback}</AvatarFallback>
      </Avatar>

      <span className="font-medium text-2xl leading-5 tracking-[1%]">{username}</span>

      <Button className="mt-3">Sair</Button>
    </form>
  );
}

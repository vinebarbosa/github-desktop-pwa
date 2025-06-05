import { auth } from '@/modules/auth';
import { signOutAction } from '@/modules/auth/server-actions/sign-out-action';
import { Avatar, AvatarFallback, AvatarImage } from '@/modules/shared/components/ui/avatar';
import { Button } from '@/modules/shared/components/ui/button';
import { luizaHubServiceFactory } from '@/modules/shared/utils/luizahub-service-factory';

export default async function ProfilePage() {
  const session = await auth();
  const authorizationToken = session?.accessToken;

  const service = luizaHubServiceFactory()

  const user = await service.getUser({ authorizationToken });

  const avatarUrl = user.avatar_url;
  const avatarFallback = user?.name.charAt(0).toUpperCase();
  const username = user.name;

  return (
    <form
      className="flex flex-1 h-full items-center justify-center flex-col gap-6"
      action={signOutAction}
    >
      <Avatar className="size-32 text-6xl">
        {avatarUrl && <AvatarImage src={avatarUrl} />}
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>

      <span className="font-medium text-2xl leading-5 tracking-[1%]">{username}</span>

      <Button className="mt-3">Sair</Button>
    </form>
  );
}

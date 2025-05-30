import { Avatar, AvatarFallback, AvatarImage } from '@/components/avatar';
import { BackButton } from '@/components/back-button';
import { Header } from '@/components/header';
import { getUser } from '@/http/get-user';
import { auth } from '@/lib/auth';

interface FollowingRepositoriesPageProps {
  params: Promise<{ username: string }>;
}

export default async function FollowingRepositoriesPage({ params }: FollowingRepositoriesPageProps) {
  const session = await auth();
  const username = (await params).username;

  const authorizationToken = session?.accessToken;

  const user = await getUser({ username, authorizationToken });
  const avatarFallback = user.name?.charAt(0).toUpperCase()

  return (
    <div className="flex flex-1">
      <Header className="flex-row">
        <BackButton>{user.name}</BackButton>
        <Avatar>
          <AvatarImage src={user.avatar_url} />
          <AvatarFallback className="text-base">{avatarFallback}</AvatarFallback>
        </Avatar>
      </Header>
    </div>
  );
}

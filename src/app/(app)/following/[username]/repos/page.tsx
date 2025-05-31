import { Avatar, AvatarFallback, AvatarImage } from '@/components/avatar';
import { BackButton } from '@/components/back-button';
import { Header } from '@/components/header';
import { RepositoriesList } from '@/components/repositories-list';
import { RepositoriesListItem } from '@/components/repositories-list-item';

import { getUser } from '@/http/get-user';
import { getUserRepositories } from '@/http/get-user-repositories';
import { auth } from '@/lib/auth';
interface FollowingRepositoriesPageProps {
  params: Promise<{ username: string }>;
}

export default async function FollowingRepositoriesPage({
  params
}: FollowingRepositoriesPageProps) {
  const session = await auth();

  const requestParams = {
    username: (await params).username,
    authorizationToken: session?.accessToken
  };

  const [user, userRepositories] = await Promise.all([
    getUser(requestParams),
    getUserRepositories(requestParams)
  ]);

  const avatarFallback = user.name?.charAt(0).toUpperCase();

  return (
    <div className="flex flex-col flex-1 space-y-4">
      <Header className="flex-row">
        <BackButton>
          <h1 className="text-base">{user.name}</h1>
        </BackButton>
        <Avatar>
          <AvatarImage src={user.avatar_url} />
          <AvatarFallback className="text-base">{avatarFallback}</AvatarFallback>
        </Avatar>
      </Header>

      <RepositoriesList>
        {userRepositories.map((repository) => (
          <RepositoriesListItem
            key={repository.id}
            description={repository.description}
            name={repository.name}
          />
        ))}
      </RepositoriesList>
    </div>
  );
}

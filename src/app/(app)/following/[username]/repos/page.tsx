import { BackButton } from '@/modules/following/components/back-button';
import { RepositoriesList } from '@/modules/repos/components/repositories-list';
import { RepositoriesListItem } from '@/modules/repos/components/repositories-list-item';
import { Header } from '@/modules/shared/components/header';
import { Avatar, AvatarFallback, AvatarImage } from '@/modules/shared/components/ui/avatar';

import { auth } from '@/modules/auth';
import { getUserRepositories } from '@/modules/repos/http/get-user-repositories';
import { getUser } from '@/modules/shared/http/get-user';
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

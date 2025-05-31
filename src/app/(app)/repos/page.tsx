
import { Header, HeaderDescription, HeaderTitle } from '@/components/header';
import { RepositoriesList } from '@/components/repositories-list';
import { RepositoriesListItem } from '@/components/repositories-list-item';

import { getUserRepositories } from '@/http/get-user-repositories';
import { auth } from '@/lib/auth';

export default async function UserRepositoriesPage() {
  const session = await auth();

  const requestParams = {
    username: session?.user?.id as string,
    authorizationToken: session?.accessToken
  };

  const userRepositories = await getUserRepositories(requestParams)

  return (
    <div className="flex flex-col flex-1 space-y-4">
      <Header>
        <HeaderTitle>Meus repositórios</HeaderTitle>
        <HeaderDescription>Seus repositórios do Github</HeaderDescription>
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

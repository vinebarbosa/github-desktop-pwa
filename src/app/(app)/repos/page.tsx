import { auth } from '@/modules/auth';

import { RepositoriesList } from '@/modules/repos/components/repositories-list';
import { RepositoriesListItem } from '@/modules/repos/components/repositories-list-item';
import { Header, HeaderDescription, HeaderTitle } from '@/modules/shared/components/header';

import { CreateRepositoryDialog } from '@/modules/repos/components/create-repository-dialog';
import { getUserRepositories } from '@/modules/repos/http/get-user-repositories';


export default async function UserRepositoriesPage() {
  const session = await auth();

  const requestParams = {
    username: session?.user?.id as string,
    authorizationToken: session?.accessToken
  };

  const userRepositories = await getUserRepositories(requestParams);

  return (
    <div className="flex flex-col flex-1 space-y-4">
      <Header className="flex-row items-center space-y-0">
        <div>
          <HeaderTitle>Meus repositórios</HeaderTitle>
          <HeaderDescription>Seus repositórios do Github</HeaderDescription>
        </div>
        <CreateRepositoryDialog />
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

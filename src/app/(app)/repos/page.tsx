import { auth } from '@/modules/auth';

import { RepositoriesList } from '@/modules/repos/components/repositories-list';
import { RepositoriesListItem } from '@/modules/repos/components/repositories-list-item';
import { Header, HeaderDescription, HeaderTitle } from '@/modules/shared/components/header';

import { CreateRepositoryDialog } from '@/modules/repos/components/create-repository-dialog';
import {
  type GetUserRepositoriesParams,
  getUserRepositories
} from '@/modules/repos/http/get-user-repositories';
import { PagePagination } from '@/modules/shared/components/page-pagination';
import { getApiPageNumber } from '@/modules/shared/utils/pagination';

interface UserRepositoriesPageProps {
  searchParams: Promise<{
    pagina?: string;
  }>;
}

export default async function UserRepositoriesPage(props: UserRepositoriesPageProps) {
  const [session, searchParams] = await Promise.all([auth(), props.searchParams]);

  const { pagina } = searchParams;

  const requestParams: GetUserRepositoriesParams = {
    username: session?.user?.id as string,
    authorizationToken: session?.accessToken,
    page: getApiPageNumber(pagina)
  };

  const [userRepositories, pagination] = await getUserRepositories(requestParams);

  return (
    <div className="flex flex-col flex-1 space-y-4">
      <Header className="flex-col md:flex-row md:items-center space-y-6 md:space-y-0">
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

      <PagePagination paginationStatus={pagination}/>
    </div>
  );
}

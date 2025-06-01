import { BackButton } from '@/modules/following/components/back-button';
import { RepositoriesList } from '@/modules/repos/components/repositories-list';
import { RepositoriesListItem } from '@/modules/repos/components/repositories-list-item';
import { Header } from '@/modules/shared/components/header';
import { Avatar, AvatarFallback, AvatarImage } from '@/modules/shared/components/ui/avatar';

import { auth } from '@/modules/auth';
import {
  type GetUserRepositoriesParams,
  getUserRepositories
} from '@/modules/repos/http/get-user-repositories';
import { PagePagination } from '@/modules/shared/components/page-pagination';
import { getUser } from '@/modules/shared/http/get-user';
import type { DefaultPageProps } from '@/modules/shared/types/default-page-props';
import { getApiPageNumber } from '@/modules/shared/utils/pagination';
interface FollowingRepositoriesPageProps extends DefaultPageProps {
  params: Promise<{ username: string }>;
}

export default async function FollowingRepositoriesPage({
  params: pageParams,
  searchParams: pageSearchParams
}: FollowingRepositoriesPageProps) {
  const [session, params, searchParams] = await Promise.all([auth(), pageParams, pageSearchParams]);

  const requestParams: GetUserRepositoriesParams = {
    username: params.username,
    authorizationToken: session?.accessToken,
    page: getApiPageNumber(searchParams.pagina)
  };

  const [user, [userRepositories, pagination]] = await Promise.all([
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

      <main>
        <RepositoriesList>
          {userRepositories.map((repository) => (
            <RepositoriesListItem
              key={repository.id}
              description={repository.description}
              name={repository.name}
            />
          ))}
        </RepositoriesList>
      </main>
      <footer>
        <PagePagination paginationStatus={pagination} />
      </footer>
    </div>
  );
}

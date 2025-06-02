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
import { Button } from '@/modules/shared/components/ui/button';
import { getUser } from '@/modules/shared/http/get-user';
import { ROUTES } from '@/modules/shared/routes';
import type { DefaultPageProps } from '@/modules/shared/types/default-page-props';
import { getApiPageNumber } from '@/modules/shared/utils/pagination';
import Link from 'next/link';
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
        <Button asChild variant="link" className="text-primary">
          <Link href={ROUTES.followingUsers}>
            <img src="/arrow-left.svg" alt="Ícone de voltar" />
            <h1 className="text-base">{user.name}</h1>
          </Link>
        </Button>

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

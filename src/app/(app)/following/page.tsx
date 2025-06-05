import { auth } from '@/modules/auth';
import type { GetFollowingUsersParams } from '@/modules/following/http/dto/get-following-users-params';
import { Header, HeaderDescription, HeaderTitle } from '@/modules/shared/components/header';

import { FollowedUserCard } from '@/modules/following/components/followed-user-card';
import { PagePagination } from '@/modules/shared/components/page-pagination';
import { luizaHubServiceFactory } from '@/modules/shared/factories/luizahub-service-factory';
import type { DefaultPageProps } from '@/modules/shared/types/default-page-props';
import { getApiPageNumber } from '@/modules/shared/utils/pagination';

export default async function FollowingUsersPage(props: DefaultPageProps) {
  const [session, searchParams] = await Promise.all([auth(), props.searchParams]);

  const authorizationToken = session?.accessToken;

  const service = luizaHubServiceFactory();

  const requestParams: GetFollowingUsersParams = {
    username: session?.user?.id as string,
    authorizationToken,
    page: getApiPageNumber(searchParams.pagina)
  };

  const [followingUsers, pagination] = await service.getFollowing(requestParams);

  return (
    <div className="flex flex-col flex-1 space-y-4">
      <Header>
        <HeaderTitle>Seguindo</HeaderTitle>
        <HeaderDescription>Perfis que você segue</HeaderDescription>
      </Header>

      <main>
        <ul className="px-8 space-y-4">
          {followingUsers.map(({ login: username }) => (
            <FollowedUserCard
              key={username}
              getUser={() => service.getUser({ username, authorizationToken })}
            />
          ))}
        </ul>

        <PagePagination paginationStatus={pagination} />
      </main>
    </div>
  );
}

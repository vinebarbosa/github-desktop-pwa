import { auth } from '@/modules/auth';
import { getFollowingUsers } from '@/modules/following/http/get-following-users';
import { Header, HeaderDescription, HeaderTitle } from '@/modules/shared/components/header';
import { getUser } from '@/modules/shared/http/get-user';

import { FollowedUserCard } from '@/modules/following/components/followed-user-card';

export default async function FollowingUsersPage() {
  const session = await auth();
  const userId = session?.user?.id;
  const authorizationToken = session?.accessToken;

  const followingUsers = await getFollowingUsers({ username: userId!, authorizationToken });

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
              getUser={() => getUser({ username, authorizationToken })}
            />
          ))}
        </ul>
      </main>
    </div>
  );
}

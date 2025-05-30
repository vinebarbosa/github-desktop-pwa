import { Header, HeaderDescription, HeaderTitle } from '@/components/header';
import { getFollowingUsers } from '@/http/get-following-users';
import { getUser } from '@/http/get-user';
import { auth } from '@/lib/auth';

import { FollowedUserCard } from '@/components/followed-user-card';

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

import { Avatar, AvatarFallback, AvatarImage } from '@/components/avatar';
import { BackButton } from '@/components/back-button';
import { Header } from '@/components/header';

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
  const username = (await params).username;

  const authorizationToken = session?.accessToken;

  const user = await getUser({ username, authorizationToken });
  const avatarFallback = user.name?.charAt(0).toUpperCase();

  const repos = await getUserRepositories({ username, authorizationToken });

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

      <ul className="px-8 space-y-4">
        {repos.map((repo) => (
          <li key={repo.id} className="flex gap-4">
            <div className="size-[4.5rem] bg-accent rounded flex items-center justify-center">
              <img src="/folder.svg" alt="Repo icon" className="size-10 text-white mb-0" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-sm leading-5 tracking-[1%]">{repo.name}</p>
              <span className="text-xs leading-5 tracking-[1%]">{repo.description}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

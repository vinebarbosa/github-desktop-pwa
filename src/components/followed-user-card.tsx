import { Avatar, AvatarFallback, AvatarImage } from '@/components/avatar';
import type { UserData } from '@/http/get-user';
import { ROUTES } from '@/lib/routes';
import Link from 'next/link';

type FollowedUserCardProps = {
  getUser: () => Promise<UserData>;
};

export async function FollowedUserCard({ getUser }: FollowedUserCardProps) {
  const user = await getUser();

  return (
    <li>
      <Link href={ROUTES.followingRepositories(user.login)} className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={user.avatar_url} />
          <AvatarFallback className="bg-muted" />
        </Avatar>

        <span className='text-sm leading-5 tracking-[1%]'>{user.name}</span>
      </Link>
    </li>
  );
}

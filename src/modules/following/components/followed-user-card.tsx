import { Avatar, AvatarFallback, AvatarImage } from '@/modules/shared/components/ui/avatar';
import type { UserData } from '@/modules/shared/http/get-user';
import { ROUTES } from '@/modules/shared/routes';
import Link from 'next/link';

type FollowedUserCardProps = {
  getUser: () => Promise<UserData>;
};

export async function FollowedUserCard({ getUser }: FollowedUserCardProps) {
  const user = await getUser();

  return (
    <li data-testid="following-item">
      <Link href={ROUTES.followingRepositories(user.login)} className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={user.avatar_url} />
          <AvatarFallback className="bg-muted" />
        </Avatar>

        <span className="text-sm leading-5 tracking-[1%]">{user.name}</span>
      </Link>
    </li>
  );
}

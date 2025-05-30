import { Header, HeaderDescription, HeaderTitle } from '@/components/header';
import { Skeleton } from '@/components/skeleton';

export default function FollowingUsersPageLoading() {
  return (
    <div className="flex flex-col flex-1 space-y-4">
      <Header>
        <HeaderTitle>Seguindo</HeaderTitle>
        <HeaderDescription>Perfis que você segue</HeaderDescription>
      </Header>

      <ul className="px-8 space-y-4">
        {Array.from({ length: 10 }).map((_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <li key={index} className="flex items-center gap-4">
            <Skeleton className="size-16 rounded-full" />
            <Skeleton className="h-3.5 w-40" />
          </li>
        ))}
      </ul>
    </div>
  );
}

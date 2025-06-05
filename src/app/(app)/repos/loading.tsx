import { Header, HeaderDescription, HeaderTitle } from '@/modules/shared/components/header';
import { Skeleton } from '@/modules/shared/components/ui/skeleton';

export default function FollowingRepositoriesPageLoading() {
  return (
    <div className="flex flex-col flex-1 space-y-4">
      <Header className="flex-row items-center space-y-0">
        <div>
          <HeaderTitle>Meus repositórios</HeaderTitle>
          <HeaderDescription>Seus repositórios do Github</HeaderDescription>
        </div>
      </Header>

      <ul className="px-8 space-y-4">
        {Array.from({ length: 10 }).map((_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <li key={index} className="flex gap-4 space-y-4">
            <Skeleton className="size-[4.5rem] rounded" />

            <div className="flex flex-col justify-center gap-4">
              <Skeleton className="h-3.5 w-28" />
              <Skeleton className="h-3 w-2xs" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

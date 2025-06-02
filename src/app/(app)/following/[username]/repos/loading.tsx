import { Skeleton } from '@/modules/shared/components/ui/skeleton';

export default function FollowingRepositoriesPageLoading() {
  return (
    <div className="flex flex-col flex-1 space-y-4">
      <div className="flex justify-between items-center w-full space-y-2 p-8">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="size-16 rounded-full" />
      </div>

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

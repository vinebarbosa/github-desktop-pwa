import { Skeleton } from '@/components/skeleton';

export default function ProfilePageLoading() {
  return (
    <div className="flex flex-1 items-center justify-center flex-col gap-6">
      <Skeleton className="size-32 rounded-full" />
      <Skeleton className="h-5 w-52" />
      <Skeleton className="h-10.5 w-28 rounded-full mt-3" />
    </div>
  );
}

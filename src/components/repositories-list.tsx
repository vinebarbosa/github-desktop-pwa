import { mergeClasses } from '@/lib/tailwind';
import type { PropsWithChildren } from 'react';

interface RepositoriesListProps extends PropsWithChildren {
  className?: string;
}

export function RepositoriesList({ children, className }: RepositoriesListProps) {
  return <ul className={mergeClasses('px-8 space-y-4', className)}>{children}</ul>;
}

import { mergeClasses } from '@/modules/shared/utils/tailwind';
import type { PropsWithChildren } from 'react';

interface PropsWithClassName {
  className?: string;
}

export function Header({ className, children }: PropsWithChildren<PropsWithClassName>) {
  return (
    <header
      className={mergeClasses('flex flex-col justify-between w-full space-y-2 p-8', className)}
    >
      {children}
    </header>
  );
}

export function HeaderTitle({ className, children }: PropsWithChildren<PropsWithClassName>) {
  return (
    <h1 className={mergeClasses('font-semibold text-[1.75rem] leading-8', className)}>
      {children}
    </h1>
  );
}

export function HeaderDescription({ className, children }: PropsWithChildren<PropsWithClassName>) {
  return <p className={mergeClasses('text-base leading-[1.125]', className)}>{children}</p>;
}

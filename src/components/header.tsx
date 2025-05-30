import { mergeClasses } from '@/lib/tailwind';
import type { ComponentProps, PropsWithChildren } from 'react';
import { Button } from './button';

interface PropsWithClassName {
  className?: string;
}

export function Header({ className, children }: PropsWithChildren<PropsWithClassName>) {
  return (
    <header className={mergeClasses('flex flex-col justify-between w-full space-y-2 p-8', className)}>
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

export function HeaderAction({ className, children, ...rest }: ComponentProps<typeof Button>) {
  return (
    <Button className={mergeClasses('w-fit self-end', className)} {...rest}>
      {children}
    </Button>
  );
}

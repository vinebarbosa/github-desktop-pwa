'use client';

import { HeaderAction } from '@/components/header';

import { useRouter } from 'next/navigation';
import type { PropsWithChildren } from 'react';

export function BackButton({ children }: PropsWithChildren) {
  const router = useRouter();

  return (
    <HeaderAction variant="link" onClick={router.back} className="text-primary">
      <img src="/arrow-left.svg" alt="Ícone de voltar" />
      {children}
    </HeaderAction>
  );
}

'use client';

import { Button } from '@/modules/shared/components/ui/button';
import { useRouter } from 'next/navigation';
import type { PropsWithChildren } from 'react';

export function BackButton({ children }: PropsWithChildren) {
  const router = useRouter();

  return (
    <Button variant="link" onClick={router.back} className="text-primary">
      <img src="/arrow-left.svg" alt="Ícone de voltar" />
      {children}
    </Button>
  );
}

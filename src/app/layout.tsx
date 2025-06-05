import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

import '@/modules/theme/theme.css';
import { fontSans } from '@/modules/theme/font';

import { Providers } from '@/modules/shared/components/providers';
import { Toaster } from '@/modules/shared/components/ui/sonner';

export const metadata: Metadata = {
  title: 'Luiza Hub',
  manifest: '/manifest.json',
  generator: 'Next.js'
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="pt-BR">
      <body className={fontSans.className}>
        <Providers>{children}</Providers>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}


import { Sidebar } from '@/components/sidebar';
import type { PropsWithChildren } from 'react';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className='flex flex-1 min-h-screen'>
      <Sidebar/>
      <main className='flex flex-1'>
        {children}
      </main>
    </div>

  )
}

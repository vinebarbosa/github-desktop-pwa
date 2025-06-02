import { Sidebar } from "@/modules/shared/components/sidebar";
import type { PropsWithChildren } from 'react';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-1 min-h-screen">
      <Sidebar />
      <div className="grow-1">{children}</div>
    </div>
  );
}

import { AppSidebar } from "@/modules/shared/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/modules/shared/components/ui/sidebar";
import type { PropsWithChildren } from 'react';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-1 min-h-screen">
      <SidebarProvider>
        <AppSidebar />
        <div className="grow-1 pb-12">
          <div className="p-6 pb-0 lg:hidden">
            <SidebarTrigger />
          </div>
          {children}
        </div>
      </SidebarProvider>
    </div>
  );
}

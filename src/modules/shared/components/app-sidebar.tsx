import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem
} from '@/modules/shared/components/ui/sidebar';
import { ROUTES } from '@/modules/shared/routes';
import Link from 'next/link';
import { Button } from './ui/button';

import { InstallAppButton } from '@/modules/pwa/components/install-app-button';
import { DiscIcon } from '../icons/disc';
import { PlayIcon } from '../icons/play';
import { UserIcon } from '../icons/user';

const navigationItems = [
  {
    title: 'Repositórios',
    href: ROUTES.repositories,
    icon: DiscIcon
  },
  {
    title: 'Seguindo',
    href: ROUTES.followingUsers,
    icon: PlayIcon
  },
  {
    title: 'Perfil',
    href: ROUTES.profile,
    icon: UserIcon
  }
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title} className="h-[1.564375rem]">
                  <Button variant="link" asChild className="h-full [&>svg]:size-6">
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </Button>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <InstallAppButton />
      </SidebarFooter>
    </Sidebar>
  );
}

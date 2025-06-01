import { InstallAppButton } from '@/modules/offline/components/install-app-button';
import { ROUTES } from '@/modules/shared/routes';
import Link from 'next/link';
import { Button } from './ui/button';

import { DiscIcon } from '@/assets/disc-icon';
import { PlayIcon } from '@/assets/play-icon';
import { UserIcon } from '@/assets/user-icon';

export function Sidebar() {
  return (
    <aside className="w-[250px] px-6 py-12 flex flex-col">
      <nav>
        <ul className="space-y-12">
          <li>
            <Button variant="link" asChild className='[&>svg]:size-6'>
              <Link href={ROUTES.repositories}>
                <DiscIcon
                  // alt="Ícone de repositórios"
                />
                Repositórios
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="link" asChild className='[&>svg]:size-6'>
              <Link href={ROUTES.followingUsers}>
                <PlayIcon
                  // alt="Ícone de perfis seguidos"
                />
                Seguindo
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="link" asChild className='[&>svg]:size-6'>
              <Link href={ROUTES.profile}>
                <UserIcon
                  // alt="Ícone de perfil do usuário"
                />
                Perfil
              </Link>
            </Button>
          </li>
        </ul>
      </nav>

      <InstallAppButton />
    </aside>
  );
}

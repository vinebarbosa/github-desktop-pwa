import { ROUTES } from '@/lib/routes';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './button';

export function Sidebar() {
  return (
    <aside className="w-[250px] px-6 py-12 flex flex-col">
      <nav>
        <ul className="space-y-12">
          <li>
            <Button variant="link" asChild>
              <Link href={ROUTES.repositories}>
                <Image
                  src="/disc.svg"
                  alt="Ícone de repositórios"
                  height={24}
                  width={24}
                  priority
                />
                Repositórios
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="link" asChild>
              <Link href={ROUTES.followingUsers}>
                <Image
                  src="/play.svg"
                  alt="Ícone de perfis seguidos"
                  height={24}
                  width={24}
                  priority
                />
                Seguindo
              </Link>
            </Button>
          </li>
          <li>
            <Button variant="link" asChild>
              <Link href={ROUTES.profile}>
                <Image
                  src="/user.svg"
                  alt="Ícone de perfil do usuário"
                  height={24}
                  width={24}
                  priority
                />
                Perfil
              </Link>
            </Button>
          </li>
        </ul>
      </nav>

      <Button variant="link" className="mt-auto">
        Instalar PWA
      </Button>
    </aside>
  );
}

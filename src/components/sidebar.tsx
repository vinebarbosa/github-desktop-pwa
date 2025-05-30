import { Button } from "./button";


export function Sidebar() {
  return (
    <aside className="w-[250px] px-6 py-12">
      <nav>
        <ul className="space-y-12">
          <li>
            <Button variant="link">
              <img
                src="/disc.svg"
                alt="Ícone de repositórios"
              />
              Repositórios
            </Button>
          </li>
          <li>
            <Button variant="link">
              <img
                src="/play.svg"
                alt="Ícone de perfis seguidos"
              />
              Seguindo
            </Button>
          </li>
          <li>
            <Button variant="link">
              <img
                src="/user.svg"
                alt="Ícone de perfil do usuário"
              />
              Perfil
            </Button>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

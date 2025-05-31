import { mergeClasses } from '@/lib/tailwind';

interface RepositoriesListItemProps {
  className?: string;
  name: string;
  description: string | null
}

export function RepositoriesListItem({ name, description, className }: RepositoriesListItemProps) {
  return (
    <li className={mergeClasses("flex gap-4", className)}>
      <div className="size-[4.5rem] bg-accent rounded flex items-center justify-center">
        <img src="/folder.svg" alt="Repo icon" className="size-10 text-white mb-0" />
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-sm leading-5 tracking-[1%]">{name}</p>
        <span className="text-xs leading-5 tracking-[1%]">{description}</span>
      </div>
    </li>
  );
}

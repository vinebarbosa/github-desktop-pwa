import { mergeClasses } from '@/modules/shared/utils/tailwind';
import { FolderIcon } from 'lucide-react';

interface RepositoriesListItemProps {
  className?: string;
  name: string;
  description: string | null;
}

export function RepositoriesListItem({ name, description, className }: RepositoriesListItemProps) {
  return (
    <li data-testid="repo-item" className={mergeClasses('flex gap-4', className)}>
      <div className='w-[4.5rem]'>
        <div className="size-[4.5rem] bg-accent rounded flex items-center justify-center">
          <FolderIcon className="size-10 text-muted mb-0" />
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-sm leading-5 tracking-[1%] ">{name}</p>
        <span className="text-xs leading-5 tracking-[1%]">{description}</span>
      </div>
    </li>
  );
}

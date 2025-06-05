import { useSearchParams } from 'next/navigation';
import type { PaginationStatus } from '../../utils/pagination';

export function usePagePagination(paginationStatus: PaginationStatus) {
  const searchParams = useSearchParams();

  const createPageHref = (pageNumber: number): string => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (pageNumber === 1) {
      newSearchParams.delete('pagina');
    } else {
      newSearchParams.set('pagina', pageNumber.toString());
    }
    return `?${newSearchParams.toString()}`;
  };

  const { page, hasNext, hasPrev } = paginationStatus;


  return {
    page,
    hasNext,
    hasPrev,
    createPageHref
  }
}

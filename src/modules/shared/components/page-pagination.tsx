'use client';

import { useSearchParams } from 'next/navigation';
import type { PaginationStatus } from '../utils/pagination';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from './ui/pagination';

interface PagePaginationProps {
  paginationStatus: PaginationStatus;
}

export function PagePagination({ paginationStatus }: PagePaginationProps) {
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

  const {
    page,
    isFirstPage,
    isLastPage,
    hasNext,
    hasPrev,
    firstPage,
    lastPage
  } = paginationStatus;

  return (
    <Pagination className="mx-auto">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={createPageHref(page - 1)}
            aria-disabled={!hasPrev}
            className={!hasPrev ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href={createPageHref(page + 1)}
            aria-disabled={!hasNext}
            className={!hasNext ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

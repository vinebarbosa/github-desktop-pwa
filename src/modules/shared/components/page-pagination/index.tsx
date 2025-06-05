'use client';

import type { PaginationStatus } from '../../utils/pagination';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from '../ui/pagination';
import { usePagePagination } from './use-page-pagination';

interface PagePaginationProps {
  paginationStatus: PaginationStatus;
}

export function PagePagination({ paginationStatus }: PagePaginationProps) {
  const { createPageHref, hasNext, hasPrev, page } = usePagePagination(paginationStatus)

  return (
    <Pagination className="mx-auto">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            data-testid="pagination-prev"
            href={createPageHref(page - 1)}
            aria-disabled={!hasPrev}
            className={!hasPrev ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            data-testid="pagination-next"
            href={createPageHref(page + 1)}
            aria-disabled={!hasNext}
            className={!hasNext ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

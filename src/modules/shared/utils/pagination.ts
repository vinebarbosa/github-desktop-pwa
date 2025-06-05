const FIRST_PAGE = 1;

export function getApiPageNumber(param: any): number {
  const num = Number(param);

  if (Number.isNaN(num)) {
    return FIRST_PAGE;
  }

  if (num <= FIRST_PAGE) {
    return FIRST_PAGE;
  }

  return num;
}

function parseLinkHeader(linkHeader: string | null): { [key: string]: string } {
  const links: { [key: string]: string } = {};
  if (!linkHeader) return links;

  for (const link of linkHeader.split(',')) {
    const parts = link.trim().split(';');
    if (parts.length < 2) continue;

    const url = parts[0].trim().slice(1, -1);
    const relMatch = parts[1].match(/rel="([^"]+)"/);

    if (url && relMatch && relMatch[1]) {
      links[relMatch[1]] = url;
    }
  }
  return links;
}

function getPageNumberFromUrl(url: string | undefined | null): number | null {
  if (!url) return null;
  try {
    const urlObj = new URL(url);
    const pageParam = urlObj.searchParams.get('page');
    const pageNum = Number(pageParam);
    return !Number.isNaN(pageNum) ? pageNum : null;
  } catch (e) {
    return null;
  }
}

export interface PaginationStatus {
  isFirstPage: boolean;
  isLastPage: boolean;
  page: number;
  hasNext: boolean;
  hasPrev: boolean;
  firstPage: number;
  lastPage: number;
}

export interface GetPaginationStatusParams {
  currentPage: number;
  linkHeader: string | null;
}

export function getPaginationStatus({
  currentPage,
  linkHeader
}: GetPaginationStatusParams): PaginationStatus {
  const isFirst = currentPage === 1;

  let isLast = false;
  let lastPageNum = currentPage;

  const parsedLinks = parseLinkHeader(linkHeader);

  if (!linkHeader) {
    isLast = true;
  } else {
    isLast = !parsedLinks.next;

    const lastUrl = parsedLinks.last;
    if (lastUrl) {
      const parsedLastPage = getPageNumberFromUrl(lastUrl);
      if (parsedLastPage !== null) {
        lastPageNum = parsedLastPage;
      }
    }
  }

  const hasNext = !isLast;
  const hasPrev = !isFirst;

  return {
    isFirstPage: isFirst,
    isLastPage: isLast,
    page: currentPage,
    hasNext: hasNext,
    hasPrev: hasPrev,
    firstPage: FIRST_PAGE,
    lastPage: lastPageNum
  };
}
export interface ApplyPaginationParams {
  url: string;
  page: number;
  perPage: number;
}

export function applyPaginationParams({ url, page, perPage }: ApplyPaginationParams): string {
  const urlObj = new URL(url);
  urlObj.searchParams.set('page', String(page));
  urlObj.searchParams.set('per_page', String(perPage));
  return urlObj.toString();
}

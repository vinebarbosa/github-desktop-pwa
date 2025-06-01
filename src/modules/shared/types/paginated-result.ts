import type { PaginationStatus } from '../utils/pagination';

export type PaginatedResult<T = unknown> = [T[], PaginationStatus];

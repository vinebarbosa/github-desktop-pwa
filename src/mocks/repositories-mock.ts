import type { UserRepositoriesData } from '@/modules/repos/http/get-user-repositories';
import type { PaginatedResult } from '@/modules/shared/types/paginated-result';
import { getPaginationStatus } from '@/modules/shared/utils/pagination';

const PER_PAGE = 5;

function createRepo(index: number): UserRepositoriesData {
  return {
    id: index,
    name: `repo-${index}`,
    description: `descrição ${index}`,
    owner: { login: `user-${index}` }
  };
}

export const repositoriesMock: Record<number, PaginatedResult<UserRepositoriesData>> = {
  1: [
    Array.from({ length: PER_PAGE }, (_, i) => createRepo(i + 1)),
    getPaginationStatus({
      currentPage: 1,
      linkHeader: [
        `<https://api.example.com/repos?page=2&per_page=${PER_PAGE}>; rel="next"`,
        `<https://api.example.com/repos?page=3&per_page=${PER_PAGE}>; rel="last"`
      ].join(', ')
    })
  ],
  2: [
    Array.from({ length: PER_PAGE }, (_, i) => createRepo(i + 1 + PER_PAGE)),
    getPaginationStatus({
      currentPage: 2,
      linkHeader: [
        `<https://api.example.com/repos?page=1&per_page=${PER_PAGE}>; rel="prev"`,
        `<https://api.example.com/repos?page=3&per_page=${PER_PAGE}>; rel="next"`,
        `<https://api.example.com/repos?page=1&per_page=${PER_PAGE}>; rel="first"`,
        `<https://api.example.com/repos?page=3&per_page=${PER_PAGE}>; rel="last"`
      ].join(', ')
    })
  ],
  3: [
    Array.from({ length: PER_PAGE }, (_, i) => createRepo(i + 1 + PER_PAGE * 2)),
    getPaginationStatus({
      currentPage: 3,
      linkHeader: [
        `<https://api.example.com/repos?page=2&per_page=${PER_PAGE}>; rel="prev"`,
        `<https://api.example.com/repos?page=1&per_page=${PER_PAGE}>; rel="first"`
      ].join(', ')
    })
  ]
};

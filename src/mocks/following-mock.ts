import type { FollowingUserData } from '@/modules/following/http/dto/following-user-data';
import type { PaginatedResult } from '@/modules/shared/types/paginated-result';
import { getPaginationStatus } from '@/modules/shared/utils/pagination';

const PER_PAGE = 5;

function createFollowing(index: number): FollowingUserData {
  return {
    login: `following-${index}`,
    avatar_url: `https://avatars.githubusercontent.com/u/${index}`
  };
}

export const followingMock: Record<number, PaginatedResult<FollowingUserData>> = {
  1: [
    Array.from({ length: PER_PAGE }, (_, i) => createFollowing(i + 1)),
    getPaginationStatus({
      currentPage: 1,
      linkHeader: [
        `<https://api.example.com/following?page=2&per_page=${PER_PAGE}>; rel="next"`,
        `<https://api.example.com/following?page=3&per_page=${PER_PAGE}>; rel="last"`
      ].join(', ')
    })
  ],
  2: [
    Array.from({ length: PER_PAGE }, (_, i) => createFollowing(i + 1 + PER_PAGE)),
    getPaginationStatus({
      currentPage: 2,
      linkHeader: [
        `<https://api.example.com/following?page=1&per_page=${PER_PAGE}>; rel="prev"`,
        `<https://api.example.com/following?page=3&per_page=${PER_PAGE}>; rel="next"`,
        `<https://api.example.com/following?page=1&per_page=${PER_PAGE}>; rel="first"`,
        `<https://api.example.com/following?page=3&per_page=${PER_PAGE}>; rel="last"`
      ].join(', ')
    })
  ],
  3: [
    Array.from({ length: PER_PAGE }, (_, i) => createFollowing(i + 1 + PER_PAGE * 2)),
    getPaginationStatus({
      currentPage: 3,
      linkHeader: [
        `<https://api.example.com/following?page=2&per_page=${PER_PAGE}>; rel="prev"`,
        `<https://api.example.com/following?page=1&per_page=${PER_PAGE}>; rel="first"`
      ].join(', ')
    })
  ]
};

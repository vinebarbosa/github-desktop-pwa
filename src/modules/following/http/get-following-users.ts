import type { PaginatedResult } from '@/modules/shared/types/paginated-result';
import { applyPaginationParams, getPaginationStatus } from '@/modules/shared/utils/pagination';
import type { FollowingUserData } from './dto/following-user-data';
import type { GetFollowingUsersParams } from './dto/get-following-users-params';

export async function getFollowingUsers({
  username,
  authorizationToken,
  page,
  perPage = 10
}: GetFollowingUsersParams): Promise<PaginatedResult<FollowingUserData>> {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json'
  };

  if (authorizationToken) {
    headers.Authorization = `Bearer ${authorizationToken}`;
  }

  const url = applyPaginationParams({
    url: `https://api.github.com/users/${username}/following`,
    page,
    perPage
  });

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
      next: {
        tags: ['get-following-users']
      },
      cache: 'force-cache'
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({ message: 'Erro desconhecido' }));
      console.error(
        `Erro ao buscar pessoas seguidas para ${username}:`,
        response.status,
        errorBody
      );
      throw new Error(
        `Falha ao buscar pessoas seguidas para ${username}: ${response.status} - ${errorBody.message || response.statusText}`
      );
    }

    const data: FollowingUserData[] = await response.json();
    const linkHeader = response.headers.get('Link');

    const paginationStatus = getPaginationStatus({
      currentPage: page,
      linkHeader
    });

    return [data, paginationStatus];
  } catch (error) {
    console.error('Erro na função getFollowingUsers:', error);
    throw error;
  }
}

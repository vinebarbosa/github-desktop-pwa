import { type PaginationStatus, getPaginationStatus } from '@/modules/shared/utils/pagination';

export interface GetUserRepositoriesParams {
  username: string;
  authorizationToken?: string;
  page: number;
  perPage?: number;
}

export interface UserRepositoriesData {
  id: number;
  name: string;
  description: string | null;
  owner: {
    login: string;
  };
}

export type PaginatedRepositoriesResult = [UserRepositoriesData[], PaginationStatus];

export async function getUserRepositories({
  username,
  authorizationToken,
  page,
  perPage = 10
}: GetUserRepositoriesParams): Promise<PaginatedRepositoriesResult> {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json'
  };

  if (authorizationToken) {
    headers.Authorization = `Bearer ${authorizationToken}`;
  }

  try {
    const getUserReposUrl = `https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}`;

    const response = await fetch(getUserReposUrl, {
      method: 'GET',
      headers: headers,
      next: {
        tags: [`repos-${username}`]
      },
      cache: 'force-cache'
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({ message: 'Erro desconhecido' }));
      console.error(
        `Erro ao buscar repositórios para o usuário ${username}:`,
        response.status,
        errorBody
      );
      throw new Error(
        `Falha ao buscar repositórios para o usuário ${username}: ${response.status} - ${errorBody.message || response.statusText}`
      );
    }

    const linkHeader = response.headers.get('Link');

    const paginationStatus = getPaginationStatus({
      apiPageNum: page,
      linkHeader
    });

    const data: UserRepositoriesData[] = await response.json();
    return [data, paginationStatus];
  } catch (error) {
    console.error('Erro na função getUserRepositories:', error);
    throw error;
  }
}

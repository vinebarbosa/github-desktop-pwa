export interface GetUserRepositoriesParams {
  username: string;
  authorizationToken?: string;
}

export interface UserRepositoriesData {
  id: number;
  name: string;
  description: string | null;
  owner: {
    login: string;
  };
}

export async function getUserRepositories({
  username,
  authorizationToken
}: GetUserRepositoriesParams): Promise<UserRepositoriesData[]> {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'GitHubViewerApp'
  };

  if (authorizationToken) {
    headers.Authorization = `Bearer ${authorizationToken}`;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`, {
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

    const data: UserRepositoriesData[] = await response.json();
    return data;
  } catch (error) {
    console.error('Erro na função getUserRepositories:', error);
    throw error;
  }
}

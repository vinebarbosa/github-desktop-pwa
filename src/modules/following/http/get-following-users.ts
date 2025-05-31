export interface GetFollowingUsersParams {
  username: string;
  authorizationToken?: string;
}

export interface FollowingUserData {
  login: string;
  avatar_url: string;
}

export async function getFollowingUsers({
  username,
  authorizationToken
}: GetFollowingUsersParams): Promise<FollowingUserData[]> {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json'
  };

  if (authorizationToken) {
    headers.Authorization = `Bearer ${authorizationToken}`;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}/following`, {
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
    return data;
  } catch (error) {
    console.error('Erro na função getFollowingUsers:', error);
    throw error;
  }
}

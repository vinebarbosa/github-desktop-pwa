interface GetUserParams {
  authorizationToken?: string;
  username: string;
}

export interface UserData {
  login: string;
  avatar_url: string;
  name: string;
}

export async function getUser({ username, authorizationToken }: GetUserParams): Promise<UserData> {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  };

  if (authorizationToken) {
    headers.Authorization = `Bearer ${authorizationToken}`;
  }

  const response = await fetch(`https://api.github.com/users/${username}`, {
    method: 'GET',
    headers: headers,
    next: {
      tags: [`user-${username}`]
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ message: 'Erro desconhecido' }));
    console.error(`Erro ao buscar usuário ${username}:`, response.status, errorBody);
    throw new Error(`Falha ao buscar dados do usuário ${username}: ${response.status} - ${errorBody.message || response.statusText}`);
  }

  const data: UserData = await response.json();
  return data;
}

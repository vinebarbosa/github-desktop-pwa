import type { GetUserParams } from './dto/get-user-params';
import type { UserResponseData } from './dto/get-user-response-data';

export async function getUser({
  username,
  authorizationToken
}: GetUserParams): Promise<UserResponseData> {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json'
  };

  if (authorizationToken) {
    headers.Authorization = `Bearer ${authorizationToken}`;
  }

  const url = username ? `https://api.github.com/users/${username}` : 'https://api.github.com/user';
  const tag = username ? `user-${username}` : 'user';

  const response = await fetch(url, {
    method: 'GET',
    headers: headers,
    next: {
      tags: [tag]
    },
    cache: 'force-cache'
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ message: 'Erro desconhecido' }));
    console.error(`Erro ao buscar usuário ${username}:`, response.status, errorBody);
    throw new Error(
      `Falha ao buscar dados do usuário ${username}: ${response.status} - ${errorBody.message || response.statusText}`
    );
  }

  const data: UserResponseData = await response.json();
  return data;
}

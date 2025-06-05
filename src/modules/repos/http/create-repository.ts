import type { CreateRepositoryParams } from './dto/create-repository-params';
import type { CreatedRepositoryData } from './dto/created-repository-data';

export async function createRepository({
  name,
  authorizationToken
}: CreateRepositoryParams): Promise<CreatedRepositoryData> {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json'
  };

  if (authorizationToken) {
    headers.Authorization = `Bearer ${authorizationToken}`;
  }

  try {
    const response = await fetch('https://api.github.com/user/repos', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        name: name
      })
    });

    if (!response.ok) {
      if (response.status === 422) {
        throw new Error('Dados inválidos.');
      }
      throw new Error('Falha ao criar repositório');
    }

    const data: CreatedRepositoryData = await response.json();
    return data;
  } catch (error) {
    console.error('Erro na função createRepository (captura geral):', error);
    throw error;
  }
}

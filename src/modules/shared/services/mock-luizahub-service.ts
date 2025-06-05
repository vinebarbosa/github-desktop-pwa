import { followingMock } from '@/mocks/following-mock';
import { repositoriesMock } from '@/mocks/repositories-mock';
import type { GetFollowingUsersParams } from '@/modules/following/http/dto/get-following-users-params';
import type { CreateRepositoryParams } from '@/modules/repos/http/dto/create-repository-params';
import type { GetUserRepositoriesParams } from '@/modules/repos/http/dto/get-user-repositories-params';
import type { LuizaHubService } from '@/modules/shared/types/luiza-hub';

export class MockLuizaHubService implements LuizaHubService {
  async createRepository({ name }: CreateRepositoryParams) {
    if (name === 'repo-invalido') {
      throw new Error('Nome inválido');
    }
    return {
      description: 'description',
      full_name: 'teste',
      id: 1,
      name: 'meu-repo'
    };
  }
  async getRepos({ page }: GetUserRepositoriesParams) {
    return repositoriesMock[page];
  }
  async getUser() {
    return {
      login: 'fulano',
      avatar_url: '',
      name: 'Fulano de Tal'
    };
  }
  async getFollowing({ page }: GetFollowingUsersParams) {
    return followingMock[page];
  }
}

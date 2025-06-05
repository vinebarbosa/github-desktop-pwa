import { followingMock } from '@/mocks/following-mock';
import { repositoriesMock } from '@/mocks/repositories-mock';
import type { GetFollowingUsersParams } from '@/modules/following/http/get-following-users';
import type { CreateRepositoryParams } from '@/modules/repos/http/create-repository';
import type { GetUserRepositoriesParams } from '@/modules/repos/http/get-user-repositories';
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

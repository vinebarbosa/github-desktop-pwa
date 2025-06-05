import { getFollowingUsers } from '@/modules/following/http/get-following-users';
import { createRepository } from '@/modules/repos/http/create-repository';
import { getUserRepositories } from '@/modules/repos/http/get-user-repositories';
import { getUser } from '../http/get-user';
import type { LuizaHubService } from '../types/luiza-hub';

export class GithubService implements LuizaHubService {
  createRepository = createRepository;
  getRepos = getUserRepositories;
  getUser = getUser;
  getFollowing = getFollowingUsers;
}

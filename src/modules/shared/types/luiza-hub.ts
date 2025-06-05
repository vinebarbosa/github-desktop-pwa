import type { FollowingUserData } from '@/modules/following/http/get-following-users';
import type { CreatedRepositoryData } from '@/modules/repos/http/create-repository';
import type { UserRepositoriesData } from '@/modules/repos/http/get-user-repositories';
import type { UserData } from '../http/get-user';
import type { PaginatedResult } from './paginated-result';

export interface LuizaHubService {
  getRepos: (...params: any[]) => Promise<PaginatedResult<UserRepositoriesData>>;
  getUser: (...params: any[]) => Promise<UserData>;
  createRepository: (...params: any[]) => Promise<CreatedRepositoryData>;
  getFollowing: (...params: any[]) => Promise<PaginatedResult<FollowingUserData>>
}

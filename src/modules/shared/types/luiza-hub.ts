import type { FollowingUserData } from '@/modules/following/http/dto/following-user-data';
import type { CreatedRepositoryData } from '@/modules/repos/http/dto/created-repository-data';
import type { UserRepositoriesData } from '@/modules/repos/http/dto/user-repositories-data';
import type { UserResponseData } from '../../user/http/dto/get-user-response-data';
import type { PaginatedResult } from './paginated-result';

export interface LuizaHubService {
  getRepos: (...params: any[]) => Promise<PaginatedResult<UserRepositoriesData>>;
  getUser: (...params: any[]) => Promise<UserResponseData>;
  createRepository: (...params: any[]) => Promise<CreatedRepositoryData>;
  getFollowing: (...params: any[]) => Promise<PaginatedResult<FollowingUserData>>;
}

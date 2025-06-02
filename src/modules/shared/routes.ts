export const ROUTES = {
  signIn: '/',
  profile: '/profile',
  repositories: '/repos',
  followingUsers: '/following',
  followingRepositories: (username: string) => `/following/${username}/repos`
};

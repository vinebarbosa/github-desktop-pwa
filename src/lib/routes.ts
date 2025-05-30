export const ROUTES = {
  signIn: "/auth/sign-in",
  profile: "/profile",
  repositories: "/repos",
  followingUsers: "/following",
  followingRepositories: (username: string) => `/following/${username}/repos`
}

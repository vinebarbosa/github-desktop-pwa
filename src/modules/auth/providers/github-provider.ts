import type { OAuthConfig, OAuthUserConfig } from 'next-auth/providers';
import type { GitHubEmail, GitHubProfile } from 'next-auth/providers/github';

export default function GitHub(
  config: OAuthUserConfig<GitHubProfile> & {
    enterprise?: {
      baseUrl?: string;
    };
  }
): OAuthConfig<GitHubProfile> {
  const baseUrl = config?.enterprise?.baseUrl ?? 'https://github.com';
  const apiBaseUrl = config?.enterprise?.baseUrl
    ? `${config?.enterprise?.baseUrl}/api/v3`
    : 'https://api.github.com';

  return {
    id: 'github',
    name: 'GitHub',
    type: 'oauth',
    authorization: {
      url: `${baseUrl}/login/oauth/authorize`,
      params: { scope: 'read:user user:email repo' }
    },
    token: `${baseUrl}/login/oauth/access_token`,
    userinfo: {
      url: `${apiBaseUrl}/user`,
      async request({
        tokens,
        provider
      }: { tokens: { access_token: string }; provider: OAuthConfig<GitHubProfile> }) {
        const profile = await fetch(provider.userinfo?.url as URL, {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
            'User-Agent': 'authjs'
          }
        }).then(async (res) => await res.json());

        if (!profile.email) {
          const res = await fetch(`${apiBaseUrl}/user/emails`, {
            headers: {
              Authorization: `Bearer ${tokens.access_token}`,
              'User-Agent': 'authjs'
            }
          });

          if (res.ok) {
            const emails: GitHubEmail[] = await res.json();
            profile.email = (emails.find((e) => e.primary) ?? emails[0]).email;
          }
        }

        return profile;
      }
    },
    profile(profile) {
      return {
        id: profile.login.toString(),
        name: profile.name ?? profile.login,
        email: profile.email,
        image: profile.avatar_url
      };
    },
    options: config
  };
}

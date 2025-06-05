import type { Provider } from 'next-auth/providers';
import { TestProvider } from '../providers/test-provider';

import GitHubProvider from '../providers/github-provider';

const providers: Provider[] = [];

export function providersFactory() {
  if (process.env.NEXT_PUBLIC_MODE === 'test') {
    providers.push(TestProvider);
    return providers;
  }
  providers.push(GitHubProvider);
  return providers;
}

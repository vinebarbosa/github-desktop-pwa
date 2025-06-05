import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';
import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from 'next/constants';

const nextConfig: NextConfig = {};

const swConfig = async (phase: string): Promise<NextConfig> => {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withSerwist = (await import('@serwist/next')).default({
      swSrc: 'src/app-worker.ts',
      swDest: 'public/sw.js',
      reloadOnOnline: true,
      disable: process.env.NODE_ENV !== 'production'
    });

    return withSerwist(nextConfig);
  }

  return nextConfig;
};

export default withSentryConfig(swConfig, {
  org: 'luizalabs-mu',
  project: 'luizahub',
  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: '/monitoring',
  disableLogger: true,
  automaticVercelMonitors: true
});

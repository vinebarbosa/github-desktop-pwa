
import type { NextConfig } from 'next';
import {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} from 'next/constants';

const nextConfig: NextConfig = {
    webpack: (config) => {
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack']
      });

      return config;
    },
    turbopack: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js'
        }
      }
    }
  }

const config = async (
  phase: string
): Promise<NextConfig> => {
  if (
    phase === PHASE_DEVELOPMENT_SERVER ||
    phase === PHASE_PRODUCTION_BUILD
  ) {
    const withSerwist = (await import('@serwist/next')).default({
      swSrc: 'src/app-worker.ts',
      swDest: 'public/sw.js',
      reloadOnOnline: true,
      disable: process.env.NODE_ENV !== "production"
    });

    return withSerwist(nextConfig);
  }

  return nextConfig;
};

export default config;


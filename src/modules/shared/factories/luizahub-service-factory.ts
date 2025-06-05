import { MockLuizaHubService } from '@/modules/shared/services/mock-luizahub-service';
import { GithubService } from '../services/github-service';
import type { LuizaHubService } from '../types/luiza-hub';

export function luizaHubServiceFactory() {
  const isTest = process.env.NEXT_PUBLIC_MODE === 'test';

  let service: LuizaHubService;

  if (isTest) {
    service = new MockLuizaHubService();
    return service;
  }

  service = new GithubService();

  return service;
}

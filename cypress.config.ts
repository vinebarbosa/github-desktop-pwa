import { defineConfig } from 'cypress';

import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  e2e: {
    setupNodeEvents() {},
    baseUrl: 'http://localhost:3000',
    testIsolation: false,
    env: {
      TEST_PASSWORD: process.env.TEST_PASSWORD
    }
  },
  chromeWebSecurity: false
});

import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({ dir: './' });

const config: Config = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/__tests__/**/*.test.tsx', '**/*.test.tsx'],
  transformIgnorePatterns: [
    '/node_modules/(?!(next-intl|@formatjs|intl-messageformat|@next/font)/)',
  ],
};

export default createJestConfig(config);

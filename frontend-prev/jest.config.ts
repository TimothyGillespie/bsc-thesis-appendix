import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
	moduleNameMapper: {
		'@core/(.*)': '<rootDir>/src/app/core/$1',
	},
	preset: 'jest-preset-angular',
	setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
	verbose: true,
};

export default config;

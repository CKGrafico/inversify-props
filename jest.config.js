module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  transformIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/**/*.test.(js|jsx|ts|tsx)|**/tests/*.(js|jsx|ts|tsx)'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testURL: 'http://localhost/',
  globals: {
    'ts-jest': {
      tsConfig: 'src/tsconfig.json'
    }
  },
  collectCoverage: true,
  setupFiles: ['./jest.setup.js']
};

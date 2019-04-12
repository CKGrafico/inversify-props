module.exports = {
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testEnvironment": 'node',
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  globals: {
    'ts-jest': {
      tsConfig: 'src/tsconfig.json'
    }
  }
}

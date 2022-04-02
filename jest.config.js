module.exports = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['**/src/views/**', '!**/node_modules/**'],
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/tests/unit/**/*.spec.{j,t}s?(x)'],
  transform: {
    '.*\\.(vue)$': 'vue-jest',
    '.*\\.(js)$': 'babel-jest',
  },
};

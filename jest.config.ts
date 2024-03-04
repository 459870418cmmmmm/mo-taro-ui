export default {
  verbose: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['./node_modules', './dist', './docs'],
  testPathIgnorePatterns: ['./node_modules', './dist', './docs'],
  // preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(j)sx?$': 'babel-jest',
    '^.+\\.(t)sx?$': 'ts-jest',
    // '^.+\\.(t)sx?$': '@swc/jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(scss|sass|css|less)$': 'identity-obj-proxy',
  },
};

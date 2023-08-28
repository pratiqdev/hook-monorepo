const esModules = ['@pratiq/hooks', ''].join('|');

const config = {
    testEnvironment: 'jest-environment-node',
    testRegex: [
        "./unit/.*\\.test\\.(js|jsx|ts|tsx|mjs|cjs)$"
    ],
    setupFilesAfterEnv: ['./utils/setupTests.js'],
    // transform: {
    //     '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    // },
    transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'mjs'],
    // testPathIgnorePatterns: ['/node_modules/', '/public/'],
    setupFilesAfterEnv: [
        '@testing-library/jest-dom/extend-expect', 
    ], // setupFiles before the tests are ran
    // extensionsToTreatAsEsm: ['.js']
    // moduleNameMapper: {
    //     "^@pratiq/hooks(.*)$": "<rootDir>../pratiq-hooks/dist/esm/index.js",
    // },
};

export default config
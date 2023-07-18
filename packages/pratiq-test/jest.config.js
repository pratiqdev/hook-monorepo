const config = {
    testRegex: [
        "/tests/.*\\.test\\.(js|jsx|ts|tsx)$"
    ],
    setupFilesAfterEnv: ['./tests/setupTests.js'],
    // transform: {
    //     '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    // },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    // testPathIgnorePatterns: ['/node_modules/', '/public/'],
    setupFilesAfterEnv: [
        '@testing-library/jest-dom/extend-expect', 
    ] // setupFiles before the tests are ran
    // moduleNameMapper: {
    //     "^@pratiq/hooks(.*)$": "<rootDir>../pratiq-hooks/dist/esm/index.js",
    // },
};
export default config
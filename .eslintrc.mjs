module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `@pratiq/eslint`
  extends: ["pratiq"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  }
};

import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportHeight: 1000,
    viewportWidth: 1600,
    video: false,

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

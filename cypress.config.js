const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://action.staging.focal.dev/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

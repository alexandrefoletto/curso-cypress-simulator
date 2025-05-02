const { defineConfig } = require("cypress")

module.exports = defineConfig({
  viewportHeight: 1024,
  viewportWidth: 1700,
  e2e: {
    env: {
        grepOmitFiltered: true,
        grepFilterSpecs: true,
      },
    fixturesFolder: false,
  },
})

// Cucumber.js configuration.
// Docs: https://github.com/cucumber/cucumber-js/blob/main/docs/configuration.md
export default {
  paths: ["features/**/*.feature"],
  import: ["features/steps/**/*.js"],
  format: [
    "summary",
    "progress-bar",
    ["html", "cucumber-report.html"]
  ],
  formatOptions: { snippetInterface: "async-await" }
};

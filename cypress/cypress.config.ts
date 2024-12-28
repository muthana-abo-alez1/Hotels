import { defineConfig } from "cypress";
import webpack from "@cypress/webpack-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    webpack({
      webpackOptions: {
        resolve: {
          extensions: [".ts", ".js"],
        },
        module: {
          rules: [
            {
              test: /\.ts$/,
              exclude: [/node_modules/],
              use: [
                {
                  loader: "ts-loader",
                },
              ],
            },
            {
              test: /\.feature$/,
              use: [
                {
                  loader: "@badeball/cypress-cucumber-preprocessor/webpack",
                  options: config,
                },
              ],
            },
          ],
        },
      },
    })
  );

  return config;
}

export default defineConfig({
  e2e: {
    //baseUrl: "https://duckduckgo.com",
    specPattern: "**/*.feature",
    setupNodeEvents,
  },
  viewportHeight: 9_00,
  viewportWidth: 16_00,
  requestTimeout: 15_0000,
  responseTimeout: 15_0000,
  pageLoadTimeout: 15_0000,
  defaultCommandTimeout: 10_000,
  video: false,
  trashAssetsBeforeRuns: true,
  numTestsKeptInMemory: 5,
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    configFile: "reporter-config.json",
  },
  chromeWebSecurity: false,
});

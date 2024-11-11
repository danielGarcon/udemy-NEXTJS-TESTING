/* eslint-disable @typescript-eslint/no-var-requires */
/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const { resetDb } = require("../../__tests__/__mocks__/db/utils/reset-db");
const { addBand } = require("../../lib/features/bands/queries");
/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  // eslint-disable-next-line no-param-reassign
  config.env.REVALIDATION_SECRET = process.env.REVALIDATION_SECRET;
  // to access within a test function:
  //  Cypress.env("REVALIDATION_SECRET")

  // plugins allow you not to have to use environment variables
  // to pass data between the test and the server
  on("task", {
    // tasks for cypress have to return null or undefined
    // "db:reset": () => resetDb().then(() => null),
    "db:reset": () => resetDb().then(() => null),
    addBand: (newBand) => {
      return addBand(newBand).then(() => null);
    },
    addReservation: (newReservation) => {
      return addReservation(newReservation).then(() => null);
    },
  });
  return config;
};

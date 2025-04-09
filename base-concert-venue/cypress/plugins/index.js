// const dotenv = require('dotenv');
const { resetDb } = require("../../__tests__/__mocks__/db/utils/reset-db");
const { addBand } = require("../../lib/features/bands/queries");
const { addReservation } = require("../../lib/features/reservations/queries");
// const dotenvExpand = require('dotenv-expand');

module.exports = (on, config) => {
  // const env = dotenv.config({ path: '.env.test.local' });
  // dotenvExpand(env);

  // Assign variables to both `process.env` and `config.env`
  // config.env = { ...config.env, ...env.parsed };
  // process.env = { ...process.env, ...env.parsed };

  // Define tasks for Cypress
  on("task", {
    "db:reset": () => resetDb().then(() => null),

    addBand: (newBand) => addBand(newBand).then(() => null),
    addReservation: (newReservation) =>
      addReservation(newReservation).then(() => null),
  });

  return config;
};

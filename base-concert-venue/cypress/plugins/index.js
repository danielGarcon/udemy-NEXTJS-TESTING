const dotenv = require('dotenv');
const { resetDB } = require("../../__tests__/__mocks__/db/utils/reset-db");
const { addBand } = require("../../lib/features/bands/queries");
const { addReservation } = require("../../lib/features/reservations/queries");
const dotenvExpand = require('dotenv-expand');

module.exports = (on, config) => {
  const env = dotenv.config({ path: '.env.test.local' });
  dotenvExpand(env);

  // Assign variables to both `process.env` and `config.env`
  config.env = { ...config.env, ...env.parsed };
  process.env = { ...process.env, ...env.parsed };



  // Define tasks for Cypress
  on("task", {
    "db:reset": () => {
      // Implement your database reset logic here
      console.log('Resetting database...');
      return null;
    },
    addBand: (newBand) => {
      // Implement your logic to add a new band here
      console.log('Adding new band:', newBand);
      return null;
    },
    addReservation: (newReservation) => {
      // Implement your logic to add a new reservation here
      console.log('Adding new reservation:', newReservation);
      return null;
    },
  });

  return config;
};
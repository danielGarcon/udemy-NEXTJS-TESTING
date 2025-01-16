const dotenv = require('dotenv');

module.exports = (on, config) => {
  const env = dotenv.config({ path: '.env.test.local' });

  // Debugging logs
  console.log('Loaded environment variables:', env.parsed);

  // Assign variables to both `process.env` and `config.env`
  config.env = { ...config.env, ...env.parsed };
  process.env = { ...process.env, ...env.parsed };

  // Debugging logs
  console.log('process.env.DB_PATH:', process.env.DB_PATH);

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
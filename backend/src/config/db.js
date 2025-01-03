const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

require('dotenv').config(); // Load the environment variables from the .env file

// Create a new instance of Sequelize with your database credentials
const sequelize = new Sequelize(
  process.env.DB_NAME, // The name of your database
  process.env.DB_USER, // The username to access the database
  process.env.DB_PASSWORD, // The password to access the database
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT, // The host of your database (default is localhost)
    dialect: 'mysql', // The type of database you are using (mysql in this case)
    logging: false, // Set to true if you want to log SQL queries
    pool: {
      max: 5, // Max number of connections in the pool
      min: 0, // Min number of connections in the pool
      acquire: 30000, // Maximum time (in ms) to wait for a connection to be established
      idle: 10000, // Maximum time (in ms) to wait for a connection to be released
    },
  }
);

// Test the connection to the database
sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// Export the sequelize instance to be used elsewhere in the application
module.exports = sequelize;
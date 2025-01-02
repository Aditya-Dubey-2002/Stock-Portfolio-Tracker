const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config(); // Load the environment variables from the .env file

// Set up the SSL option if required
const sslOption = process.env.DB_SSL === 'true' ? {
  ssl: {
    require: true,
    rejectUnauthorized: false, // Disable certificate verification for ease of connection
  },
} : {};

const sequelize = new Sequelize(
  process.env.DB_NAME, // The name of your database
  process.env.DB_USER, // The username to access the database
  process.env.DB_PASSWORD, // The password to access the database
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // Use the DB port from the .env file
    dialect: 'mysql',
    logging: false, // Set to true if you want to log SQL queries
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    ...sslOption, // Add SSL option if required
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

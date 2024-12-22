// src/models/User.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Importing the Sequelize instance

const User = sequelize.define('User', {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,  // Auto-increment this field
      allowNull: false,
      defaultValue: 0,
    },
    fullName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    // Other fields
  }, {
    timestamps: true,
    tableName: 'users',
  });
  

module.exports = User;

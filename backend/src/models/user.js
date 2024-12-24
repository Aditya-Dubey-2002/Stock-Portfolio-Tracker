const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Importing the Sequelize instance

const User = sequelize.define('User', {
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,  // Auto-increment this field
        allowNull: false,
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
    bio: {
        type: Sequelize.TEXT, // To allow for larger text input
        allowNull: true, // Bio can be null
    },
    balance: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 10000, // Default balance for new users
    },
    image: {
        type: Sequelize.STRING, // Storing the image as a URL or file path
        allowNull: true, // Image can be null
    }
}, {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
    tableName: 'users', // Explicitly setting the table name
});

module.exports = User;
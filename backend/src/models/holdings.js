const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');

const Holding = sequelize.define('Holding', {
    holdingId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'user_id',
        },
        allowNull: false,
    },
    stockId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    buyPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    purchaseDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: false, // Disable createdAt and updatedAt columns
});

Holding.belongsTo(User, { foreignKey: 'userId' });

module.exports = Holding;

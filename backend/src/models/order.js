const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');
const Holdings = require('./holdings'); // If you have the Holdings model imported here

const Order = sequelize.define('Order', {
  orderId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'userId',
    },
    allowNull: false,
  },
  stockId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  orderType: {
    type: DataTypes.ENUM('buy', 'sell'),
    allowNull: false,
  },
  orderTime: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  quantity: {
    type: DataTypes.INTEGER, // Quantity of the stock being bought or sold
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2), // Total amount for the order (quantity * price)
    allowNull: false,
  },
}, {
  timestamps: false,
});

// Associations
Order.belongsTo(User, { foreignKey: 'userId' }); // Foreign key relation with User

module.exports = Order;

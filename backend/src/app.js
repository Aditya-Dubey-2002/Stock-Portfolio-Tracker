const sequelize = require('./config/database');  // Path to your database config
const User = require('./models/User');  // Import the User model

// Sync all models
const stockAllocation = require('./services/stockAllocation');

console.log(stockAllocation);
sequelize.sync({ force: true }).then(() => {
    console.log('Database synced!');
  }).catch(err => {
    console.error('Error syncing database:', err);
  });
  

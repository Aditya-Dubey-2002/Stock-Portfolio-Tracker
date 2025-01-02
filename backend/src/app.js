const sequelize = require('./config/db.js');  // Path to your database config
const User = require('./models/User');  // Import the User model

// Sync all models

sequelize.sync({ force: true }).then(() => {
    console.log('Database synced!');
  }).catch(err => {
    console.error('Error syncing database:', err);
  });
  

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./src/config/db.js');
const authRoutes = require('./src/routes/authRoutes.js');
const userRoutes = require('./src/routes/userRoutes.js');
const orderRoutes = require('./src/routes/orderRoutes.js');
const stockRoutes = require('./src/routes/stockRoutes.js');
const holdingsRoutes = require('./src/routes/holdingsRoutes.js');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Use the auth routes
app.use('/api/auth', authRoutes);

// User Routes
app.use('/api/user', userRoutes);
// Order Routes
app.use('/api/orders', orderRoutes);
// Stock Routes
// Use the stock routes
app.use('/api/stock', stockRoutes);

// Holdings Route
app.use('/api/holdings', holdingsRoutes);

// Sync the database and start the server

sequelize.sync()
    .then(() => {
        app.listen(5000, () => {
            console.log('Server running on port 5000');
        });
    })
    .catch((error) => console.log(error));

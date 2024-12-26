const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const stockRoutes = require('./src/routes/stockRoutes');
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

// Sync the database and start the server
sequelize.sync()
    .then(() => {
        app.listen(5000, () => {
            console.log('Server running on port 5000');
        });
    })
    .catch((error) => console.log(error));

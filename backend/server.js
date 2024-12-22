const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Use the auth routes
app.use('/api/auth', authRoutes);

// Sync the database and start the server
sequelize.sync()
    .then(() => {
        app.listen(5000, () => {
            console.log('Server running on port 5000');
        });
    })
    .catch((error) => console.log(error));

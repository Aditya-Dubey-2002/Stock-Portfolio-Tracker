const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./src/config/db.js');
const authRoutes = require('./src/routes/authRoutes.js');
const userRoutes = require('./src/routes/userRoutes.js');
const orderRoutes = require('./src/routes/orderRoutes.js');
const stockRoutes = require('./src/routes/stockRoutes.js');
const holdingsRoutes = require('./src/routes/holdingsRoutes.js');
const path = require('path');
// const documentation = require('./src/data/documentation.js');
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
app.get('/',(req,res)=>{
    res.send('Welcome to the StockItUp API ! Go to /help for documentation.');
})

app.get('/help',(req,res)=>{
    const filePath = path.join(__dirname, 'documentation.html'); // Path to your HTML file
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(500).send('An error occurred while sending the file.');
        }
    });
})

sequelize.sync()
    .then(() => {
        app.listen(5000, () => {
            console.log('Server running on port 5000');
        });
    })
    .catch((error) => console.log(error));

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
require('dotenv').config(); // Ensure environment variables are loaded
const stockAllocation = require('../services/stockAllocation.js');
const { response } = require('express');



// Register a new user
const register = async (req, res) => {
    // console.log(req.body);
    const { fullName, email, password } = req.body;
    console.log(fullName);
    try {
        // Check if user already exists
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const user = await User.create({
            fullName,  // Save the full name
            email,
            password: hashedPassword,
        });

        // console.log(user);

        // Generate JWT token
        const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        // const allocatedStocks = await stockAllocation.allocateRandomStocks(5,user.userId);
        // console.log(allocatedStocks);
        // Send response with token
        res.status(201).json({ token });
        console.log("Registration Successful");
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Login user
// Login endpoint
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if password matches
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send response with token
        res.json({ token });
        console.log("Login Successful");
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

//   module.exports = { login };


module.exports = { register, login };

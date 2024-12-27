const Order = require('../models/order.js');
const User = require('../models/User');
const Holding = require('../models/holdings.js')
const db = require('../config/db.js');

// Create an order
const createOrder = async (req, res) => {
    const { stockId, orderType, price, quantity } = req.body;
    const userId = req.user.userId; // Get user from JWT token
    // console.log(userId);

    if (orderType === 'buy') {
        try {
            // Fetch user details
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Calculate the total amount for the order
            const buyPrice = parseFloat(price);
            const totalAmount = quantity * buyPrice;

            // Check if the user has sufficient balance
            if (user.balance < totalAmount) {
                return res.status(400).json({ message: 'Insufficient balance' });
            }

            // Deduct the balance
            user.balance = parseFloat(user.balance) - totalAmount;
            await user.save();

            // Check if the user already has the stock in their holdings
            const holding = await Holding.findOne({ where: { userId, stockId, buyPrice } });

            if (holding) {
                // If holding exists, update the quantity and total price
                holding.quantity = parseFloat(holding.quantity) + quantity;
                holding.totalPrice = parseFloat(holding.totalPrice)+ totalAmount;
                await holding.save();
            } else {
                // Create new holding if not exists
                await Holding.create({
                    userId,
                    stockId,
                    quantity,
                    buyPrice,
                    totalPrice: totalAmount
                });
            }

            // Create the order in the database
            const order = await Order.create({
                userId,
                stockId,
                orderType: 'buy',
                quantity,
                amount: totalAmount
            });
            // console.log(order);
            // Check if the order was successfully created
            if (order.orderId>0) {
                console.log(`Successfully placed buy order for ${stockId}`);
                return res.status(201).json({ message: 'Buy order placed successfully', order });
            } else {
                console.error('Error: Failed to create the order');
                return res.status(500).json({ message: 'Error placing buy order' });
            }

        } catch (err) {
            // Log the error and send a proper response
            console.error('Error placing buy order:', err);
            return res.status(500).json({ message: 'Error placing buy order', error: err.message });
        }
    } else if (orderType === 'sell') {
        try {
            const holdings = await Holding.findAll({ where: { userId, stockId } });

            if (!holdings || holdings.length === 0) {
                return res.status(400).json({ message: 'No holdings for this stock' });
            }

            const sellPrice = price;
            holdings.sort((a, b) => a.buyPrice - b.buyPrice);

            let totalQuantityToSell = quantity;
            let totalAmount = 0;

            for (const holding of holdings) {
                if (totalQuantityToSell <= 0) break;

                const availableQuantity = holding.quantity;

                if (availableQuantity <= totalQuantityToSell) {
                    totalAmount = parseFloat(totalAmount)+ availableQuantity * sellPrice;
                    totalQuantityToSell = parseFloat(holding.quantity) - availableQuantity;
                    await holding.destroy();
                } else {
                    totalAmount = parseFloat(totalAmount)+ totalQuantityToSell * sellPrice;
                    holding.quantity = parseFloat(holding.quantity) - totalQuantityToSell;
                    await holding.save();
                    totalQuantityToSell = 0;
                }
            }

            if (totalQuantityToSell > 0) {
                return res.status(400).json({ message: 'Not enough stock to sell' });
            }

            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            user.balance = parseFloat(user.balance) + totalAmount;
            // console.log(user.balance);
            await user.save();

            const order = await Order.create({
                userId,
                stockId,
                orderType: 'sell',
                quantity,
                amount: totalAmount
            });

            return res.status(201).json({ message: 'Sell order placed successfully', order });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error placing sell order', error: err.message });
        }
    } else {
        return res.status(400).json({ message: 'Invalid order type' });
    }
};

// Get orders for a user
const getOrders = async (req, res) => {
    const { userId } = req.params;

    try {
        const orders = await Order.findAll({ where: { user_id: userId } });
        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found' });
        }
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
    }
};

module.exports = { createOrder, getOrders };

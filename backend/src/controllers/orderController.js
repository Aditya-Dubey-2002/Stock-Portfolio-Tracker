const Order = require('../models/order.js');
const User = require('../models/User');
const Holding = require('../models/holdings.js')
const db = require('../config/db.js');

// Create an order
const createOrder = async (req, res) => {
    const { stockId, orderType, price, quantity } = req.body;
    const userId = req.user.userId; // Get user from JWT token
    console.log(userId);

    if (orderType === 'buy') {
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const buyPrice = price;
            const totalAmount = quantity * buyPrice;

            // console.log(user.balance);
            if (user.balance < totalAmount) {
                return res.status(400).json({ message: 'Insufficient balance' });
            }

            user.balance -= totalAmount;
            await user.save();

            const holding = await Holding.findOne({ where: { userId, stockId, buyPrice } });

            if (holding) {
                holding.quantity += quantity;
                holding.totalPrice += totalAmount;
                await holding.save();
            } else {
                await Holding.create({
                    userId,
                    stockId,
                    quantity,
                    buyPrice,
                    totalPrice: totalAmount
                });
            }

            const order = await Order.create({
                userId,
                stockId,
                orderType: 'buy',
                quantity,
                amount: totalAmount
            });

            return res.status(201).json({ message: 'Buy order placed successfully', order });
        } catch (err) {
            console.error(err);
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
                    totalAmount += availableQuantity * sellPrice;
                    totalQuantityToSell -= availableQuantity;
                    await holding.destroy();
                } else {
                    totalAmount += totalQuantityToSell * sellPrice;
                    holding.quantity -= totalQuantityToSell;
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
            console.log(user.balance);
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

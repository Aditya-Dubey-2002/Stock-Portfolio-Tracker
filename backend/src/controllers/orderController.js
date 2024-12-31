const Order = require('../models/order.js');
const User = require('../models/User');
const Holding = require('../models/holdings.js')
const db = require('../config/db.js');

// Create an order
const createOrder = async (req, res) => {
    const { stockId, orderType, price, quantity } = req.body;
    const userId = req.user.userId; // Get user from JWT token

    // Start a transaction
    const transaction = await db.transaction();

    try {
        // Fetch user details with a lock
        const user = await User.findByPk(userId, {
            transaction,
            lock: transaction.LOCK.UPDATE, // Apply a row-level lock
        });

        if (!user) {
            await transaction.rollback();
            return res.status(404).json({ message: 'User not found' });
        }
        if (orderType === 'buy') {
            // Fetch user details within the transaction
            const user = await User.findByPk(userId, { transaction });
            if (!user) {
                await transaction.rollback();
                return res.status(404).json({ message: 'User not found' });
            }

            // Calculate the total amount for the order
            const buyPrice = parseFloat(price);
            const totalAmount = parseFloat(quantity * buyPrice);

            // Check if the user has sufficient balance
            if (user.balance < totalAmount) {
                await transaction.rollback();
                return res.status(400).json({ message: 'Insufficient balance' });
            }

            // Deduct the balance
            user.balance = parseFloat(user.balance) - totalAmount;
            console.log(user.balance);
            await user.save({ transaction });

            // Check if the user already has the stock in their holdings
            const holding = await Holding.findOne({ where: { userId, stockId, buyPrice }, transaction });

            if (holding) {
                // If holding exists, update the quantity and total price
                holding.quantity = parseFloat(holding.quantity) + quantity;
                holding.totalPrice = parseFloat(holding.totalPrice) + totalAmount;
                await holding.save({ transaction });
            } else {
                // Create new holding if not exists
                await Holding.create({
                    userId,
                    stockId,
                    quantity,
                    buyPrice,
                    totalPrice: totalAmount
                }, { transaction });
            }

            // Create the order in the database
            const order = await Order.create({
                userId,
                stockId,
                orderType: 'buy',
                quantity,
                amount: totalAmount
            }, { transaction });

            // Commit the transaction
            await transaction.commit();

            console.log(`Successfully placed buy order for ${stockId}`);
            return res.status(201).json({ message: 'Buy order placed successfully', order });
        }
        else if (orderType === 'sell') {
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
                        totalAmount = parseFloat(totalAmount) + availableQuantity * sellPrice;
                        totalQuantityToSell = parseFloat(holding.quantity) - availableQuantity;
                        await holding.destroy();
                    } else {
                        totalAmount = parseFloat(totalAmount) + totalQuantityToSell * sellPrice;
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
    } catch (err) {
        // Rollback the transaction on error
        await transaction.rollback();
        console.error('Error placing order:', err);
        return res.status(500).json({ message: 'Error placing order', error: err.message });
    }
};

// Get orders for a user
const getOrders = async (req, res) => {
    const userId = req.user.userId;
    try {
        const orders = await Order.findAll({ where: { userId: userId } });
        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found' });
        }
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
    }
};

module.exports = { createOrder, getOrders };

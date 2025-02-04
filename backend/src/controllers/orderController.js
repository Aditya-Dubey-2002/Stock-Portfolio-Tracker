const Order = require('../models/order.js');
const User = require('../models/user.js');
const Holding = require('../models/holdings.js');
const db = require('../config/db.js');

// Create an order
const createOrder = async (req, res) => {
    const { stockId, orderType, price, quantity } = req.body;
    const userId = req.user.userId; // Get user from JWT token

    // Retry mechanism to handle potential lock timeout issues
    const MAX_RETRIES = 3;
    let retries = MAX_RETRIES;

    while (retries > 0) {
        const transaction = await db.transaction();
        try {
            // Fetch user details with a row-level lock
            const user = await User.findByPk(userId, {
                transaction,
                lock: transaction.LOCK.UPDATE,
            });

            if (!user) throw new Error('User not found');

            if (orderType === 'buy') {
                const totalAmount = parseFloat(quantity * price);

                // Check if the user has sufficient balance
                if (user.balance < totalAmount) {
                    throw new Error('Insufficient balance');
                }

                // Deduct balance
                user.balance = parseFloat(user.balance) - totalAmount;
                await user.save({ transaction });

                // Check and update holdings
                const holding = await Holding.findOne({
                    where: { userId, stockId, buyPrice: price },
                    transaction,
                });

                if (holding) {
                    holding.quantity = parseFloat(holding.quantity) + quantity;
                    holding.totalPrice = parseFloat(holding.totalPrice) + totalAmount;
                    await holding.save({ transaction });
                } else {
                    await Holding.create(
                        {
                            userId,
                            stockId,
                            quantity,
                            buyPrice: price,
                            totalPrice: totalAmount,
                        },
                        { transaction }
                    );
                }

                // Create order
                const order = await Order.create(
                    {
                        userId,
                        stockId,
                        orderType: 'buy',
                        quantity,
                        amount: totalAmount,
                    },
                    { transaction }
                );

                await transaction.commit();
                return res.status(201).json({ message: 'Buy order placed successfully', order });
            } else if (orderType === 'sell') {
                const holdings = await Holding.findAll({
                    where: { userId, stockId },
                    transaction,
                    lock: transaction.LOCK.UPDATE,
                });

                if (!holdings || holdings.length === 0) {
                    throw new Error('No holdings for this stock');
                }

                let totalQuantityToSell = parseInt(quantity);
                let totalAmount = 0;
                let totalGain = 0;
                let quantitySold = 0;
                // let totalProfit = 0;

                // Sort holdings by buy price (FIFO)
                holdings.sort((a, b) => a.buyPrice - b.buyPrice);
                for(const holding of holdings){
                    console.log(holding.buyPrice);
                }
                // let profit = 0;
                for (const holding of holdings) {
                    if (totalQuantityToSell <= 0) break;

                    const availableQuantity = holding.quantity;

                    if (availableQuantity <= totalQuantityToSell) {
                        totalAmount += parseFloat(availableQuantity * price);
                        totalQuantityToSell -= parseInt(availableQuantity);
                        quantitySold += parseInt(availableQuantity);
                        await holding.destroy({ transaction });
                    } else {
                        totalAmount += parseFloat(totalQuantityToSell * price);
                        holding.quantity = parseInt(availableQuantity) - totalQuantityToSell;
                        quantitySold += parseInt(totalQuantityToSell);
                        await holding.save({ transaction });
                        totalQuantityToSell = 0;
                    }
                }
                
                let totalBoughtValue = 0;
                let cnt=0;
                for(let holding of holdings){
                    if(parseInt(holding.quantity)+parseInt(cnt)<=parseFloat(quantitySold)){
                    totalBoughtValue = parseFloat(totalBoughtValue) + parseFloat(parseFloat(holding.buyPrice)*parseInt(holding.quantity));
                    cnt+=parseInt(holding.quantity);
                    }
                    else{
                    totalBoughtValue = parseFloat(totalBoughtValue) + parseFloat(parseFloat(holding.buyPrice)*parseInt(quantitySold-parseInt(cnt)));
                    cnt=quantitySold;
                    }
                    if(cnt==quantitySold){
                        break;
                    }   
                }
                totalGain = parseFloat(price*parseInt(quantitySold))-parseFloat(totalBoughtValue);
                console.log('Total Bought value:',totalBoughtValue);
                console.log(price);
                console.log(quantitySold);
                console.log(totalGain);
                
                
                // console.log(totalBoughtValue);
                if (totalQuantityToSell > 0) {
                    throw new Error('Not enough stock to sell');
                }

                user.balance = parseFloat(user.balance) + totalAmount;
                user.profit = parseFloat(user.profit) + totalGain;
                await user.save({ transaction });
                totalGain = totalGain.toFixed(2);
                const order = await Order.create(
                    {
                        userId,
                        stockId,
                        orderType: 'sell',
                        quantity,
                        amount: totalAmount,
                        profit: totalGain,
                    },
                    { transaction }
                );
                
                const msg = "Sell order placed successfully with a net profit of $" + parseFloat(totalGain);
                await transaction.commit();
                return res.status(201).json({ message: msg,totalGain, order });
            } else {
                throw new Error('Invalid order type');
            }
        } catch (err) {
            await transaction.rollback();

            if (err.code === 'ER_LOCK_WAIT_TIMEOUT' && retries > 1) {
                retries -= 1;
                continue; // Retry transaction
            }

            console.error('Error placing order:', err);
            return res.status(500).json({ message: err.message });
        }
    }

    return res.status(500).json({ message: 'Transaction failed after multiple retries' });
};

// Get orders for a user
const getOrders = async (req, res) => {
    const userId = req.user.userId;
    try {
        const orders = await Order.findAll({ where: { userId } });
        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found' });
        }
        res.json(orders);
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
    }
};

module.exports = { createOrder, getOrders };

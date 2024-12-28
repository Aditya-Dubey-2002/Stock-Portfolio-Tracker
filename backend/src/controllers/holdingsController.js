const Order = require('../models/order.js');
const User = require('../models/User.js');
const Holding = require('../models/holdings.js')
const db = require('../config/db.js');

const getHoldings = async (req, res) => {
    const { userId } = req.params;
    // console.log(userId);
    try {
        const holdings = await Holding.findAll({ where: { userId: userId } });
        if (holdings.length === 0) {
            return res.status(404).json({ message: 'No holdings found' });
        }
        res.json(holdings);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
    }
};

module.exports = {getHoldings};
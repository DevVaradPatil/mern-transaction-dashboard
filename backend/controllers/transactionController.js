const Transaction = require('../models/Transaction');

const getTransactions = async (req, res) => {
    const { search = '', page = 1, perPage = 10, month } = req.query;
    const regex = new RegExp(search, 'i');

    const query = {
        $or: [
            { title: regex },
            { description: regex },
        ]
    };

    if (search.trim() !== '') {
        const priceValue = parseFloat(search);
        if (!isNaN(priceValue)) {
            query.$or.push({ price: priceValue });
        } else {
            query.$or.push({ title: regex }, { description: regex });
        }
    }

    if (month) {
        const monthInt = parseInt(month);
        if (monthInt < 0 || monthInt > 11) {
            return res.status(400).json({ message: 'Invalid month value. Must be between 0 and 11.' });
        }
        query.$expr = {
            $eq: [{ $month: "$dateOfSale" }, monthInt + 1]
        };
    }

    try {
        const transactions = await Transaction.find(query)
            .skip((page - 1) * perPage)
            .limit(perPage);
        const total = await Transaction.countDocuments(query);

        res.status(200).json({ transactions, total, page, perPage });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transactions', error });
    }
};

module.exports = { getTransactions };

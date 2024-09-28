const Transaction = require('../models/Transaction');
const fetchDataFromAPI = require('../utils/apiUtils');

const initializeDatabase = async (req, res) => {
  try {
    const data = await fetchDataFromAPI();
    await Transaction.deleteMany();
    await Transaction.insertMany(data);
    res.status(200).json({ message: 'Database initialized successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error initializing database', error });
  }
};

module.exports = { initializeDatabase };

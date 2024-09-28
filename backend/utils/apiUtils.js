const axios = require('axios');

const fetchDataFromAPI = async () => {
  const url = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch data');
  }
};

module.exports = fetchDataFromAPI;

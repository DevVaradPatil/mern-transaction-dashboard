const Transaction = require("../models/Transaction");

const getBarChartData = async (req, res) => {
  const { month } = req.query;

  const priceRanges = [
    { range: "0 - 100", min: 0, max: 100 },
    { range: "101 - 200", min: 101, max: 200 },
    { range: "201 - 300", min: 201, max: 300 },
    { range: "301 - 400", min: 301, max: 400 },
    { range: "401 - 500", min: 401, max: 500 },
    { range: "501 - 600", min: 501, max: 600 },
    { range: "601 - 700", min: 601, max: 700 },
    { range: "701 - 800", min: 701, max: 800 },
    { range: "801 - 900", min: 801, max: 900 },
    { range: "901-above", min: 901, max: Infinity },
  ];

  try {
    const results = priceRanges.map((range) => ({
      range: range.range,
      count: 0,
    }));

    const transactions = await Transaction.find({
      $expr: {
        $and: [
          { $eq: [{ $month: "$dateOfSale" }, parseInt(month) + 1] },
        ],
      },
    });

    transactions.forEach((transaction) => {
      const price = transaction.price;
      for (const range of priceRanges) {
        if (price >= range.min && price <= range.max) {
          const resultIndex = results.findIndex(
            (res) => res.range === range.range
          );
          results[resultIndex].count++;
          break;
        }
      }
    });

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bar chart data", error });
  }
};

const getPieChartData = async (req, res) => {
  const { month } = req.query;

  const monthInt = parseInt(month, 10);
  if (isNaN(monthInt) || monthInt < 0 || monthInt > 11) {
    return res.status(400).json({ message: "Invalid month parameter. Month must be an integer between 0 and 11." });
  }

  const dateQuery = {
    $expr: {
      $eq: [{ $month: "$dateOfSale" }, monthInt + 1], 
    },
  };

  try {
    const pieChartData = await Transaction.aggregate([
      { $match: dateQuery },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    if (pieChartData.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(pieChartData);
  } catch (error) {
    console.error("Error fetching pie chart data:", error); 
    res.status(500).json({ message: "Error fetching pie chart data", error: error.message });
  }
};

module.exports = { getBarChartData, getPieChartData };


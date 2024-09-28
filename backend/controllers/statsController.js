const Transaction = require("../models/Transaction");

const getStatistics = async (req, res) => {
  const { month } = req.query;

  const monthInt = parseInt(month, 10);
  if (isNaN(monthInt) || monthInt < 0 || monthInt > 11) {
    return res.status(400).json({ message: "Invalid month value. Must be between 0 and 11." });
  }
  
  console.log(`Month: ${monthInt}`);
  

  const startDate = new Date(2000, monthInt - 1, 1);
  const endDate = new Date(2000, monthInt, 0, 23, 59, 59, 999); 

  console.log(`Date Range: ${startDate} to ${endDate}`);

  const dateQuery = {
    $expr: {
      $and: [
        { $eq: [{ $month: "$dateOfSale" }, monthInt + 1] },
      ],
    },
  };

  try {
    const soldItems = await Transaction.countDocuments({
      ...dateQuery,
      sold: true,
    });
    const notSoldItems = await Transaction.countDocuments({
      ...dateQuery,
      sold: false,
    });
    const totalSaleAmount = await Transaction.aggregate([
      { $match: { ...dateQuery, sold: true } },
      { $group: { _id: null, total: { $sum: "$price" } } },
    ]);

    console.log({
      totalSaleAmount: totalSaleAmount[0]?.total || 0,
      soldItems,
      notSoldItems,
    });

    res.status(200).json({
      totalSaleAmount: totalSaleAmount[0]?.total || 0,
      soldItems,
      notSoldItems,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching statistics", error });
  }
};

module.exports = { getStatistics };

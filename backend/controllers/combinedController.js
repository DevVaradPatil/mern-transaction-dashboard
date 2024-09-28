const { getStatistics } = require('./statsController');
const { getBarChartData } = require('./chartController');
const { getPieChartData } = require('./chartController');

const getCombinedData = async (req, res) => {
  const { month } = req.query;

  try {
    const [statistics, barChartData, pieChartData] = await Promise.all([
      getStatisticsData(month),
      getBarChartDataData(month),
      getPieChartDataData(month),
    ]);

    const combinedData = {
      statistics,
      barChartData,
      pieChartData,
    };

    res.status(200).json(combinedData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching combined data', error });
  }
};

const getStatisticsData = async (month) => {
  const req = { query: { month } };
  let data;
  await getStatistics(req, {
    status: () => ({ json: (result) => { data = result; } }),
  });
  return data;
};

const getBarChartDataData = async (month) => {
  const req = { query: { month } };
  let data;
  await getBarChartData(req, {
    status: () => ({ json: (result) => { data = result; } }),
  });
  return data;
};

const getPieChartDataData = async (month) => {
  const req = { query: { month } };
  let data;
  await getPieChartData(req, {
    status: () => ({ json: (result) => { data = result; } }),
  });
  return data;
};

module.exports = { getCombinedData };

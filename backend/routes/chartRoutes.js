const express = require('express');
const { getBarChartData } = require('../controllers/chartController');
const { getPieChartData } = require('../controllers/chartController');
const router = express.Router();

router.get('/barchart', getBarChartData);
router.get('/piechart', getPieChartData);

module.exports = router;

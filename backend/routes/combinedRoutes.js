const express = require('express');
const { getCombinedData } = require('../controllers/combinedController');
const router = express.Router();

router.get('/combined', getCombinedData);

module.exports = router;

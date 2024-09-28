const express = require('express');
const { initializeDatabase } = require('../controllers/seedController');
const router = express.Router();

router.get('/seed', initializeDatabase);

module.exports = router;

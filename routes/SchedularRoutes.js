// routes/schedularRoutes.js
const express = require('express');
const router = express.Router();
const schedularController = require('../controllers/SchedularController');

// Route to start the scheduler
router.get('/start', schedularController.startScheduler);

// Route to stop the scheduler
router.get('/stop', schedularController.stopScheduler);

module.exports = router;

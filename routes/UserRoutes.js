// routes/partnerRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

// Define the /PartnerApi/GetUsers route
router.get('/GetUsers', userController.getUsers);

module.exports = router;


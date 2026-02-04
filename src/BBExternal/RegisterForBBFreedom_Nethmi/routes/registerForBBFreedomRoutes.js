const express = require('express');
const router = express.Router();
const { registerForBBFreedom } = require('../controllers/registerForBBFreedomController');

router.post('/RegisterForBBFreedom', registerForBBFreedom);

module.exports = router;

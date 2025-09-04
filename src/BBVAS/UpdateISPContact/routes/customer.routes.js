const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer.controller');

// TMF629-compliant route for updating a customer
router.put('/BBVAS/UpdateISPContact/:id', customerController.updateCustomer);

module.exports = router;
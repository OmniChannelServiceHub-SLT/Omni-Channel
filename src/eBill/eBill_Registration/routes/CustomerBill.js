const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/customerBillController');

router.post('/customerBill', ctrl.createCustomerBill);
router.get('/customerBill/:id', ctrl.getCustomerBill);
router.post('/customerBillOnDemand', ctrl.createCustomerBillOnDemand);

module.exports = router;

const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerBillController");

/**
 * @route PATCH /customer/:id
 * @desc Update customer eBill registration / notification preferences
 */
router.patch("/:id", customerController.updateCustomerForEBill);

/**
 * @route GET /customer/:id
 * @desc Retrieve customer
 */
router.get("/:id", customerController.getCustomer);

module.exports = router;
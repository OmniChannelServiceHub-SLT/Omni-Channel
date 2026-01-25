// routes/bbExternal.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/getBBPackageDetails.controller');




router.get("/GetBBPackageDetails", controller.getBBPackageDetails);

module.exports = router;

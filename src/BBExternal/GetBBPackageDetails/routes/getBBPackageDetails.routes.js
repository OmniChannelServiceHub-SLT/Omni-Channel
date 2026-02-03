// routes/bbExternal.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/getBBPackageDetails.controller');
<<<<<<< HEAD




router.get('/', controller.getBBPackageDetails);
=======
const authMiddleware = require("../../../middleware/authMiddleware");



router.get('/', authMiddleware, controller.getBBPackageDetails);
>>>>>>> dev

module.exports = router;

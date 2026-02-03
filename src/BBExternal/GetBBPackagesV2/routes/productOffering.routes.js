// routes/bbExternal.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/productOffering.controller');
<<<<<<< HEAD
=======
const authMiddleware = require("../../../middleware/authMiddleware");
>>>>>>> dev



// GetBBPackagesV2
<<<<<<< HEAD
router.get('/', controller.getBBPackagesV2);
=======
router.get('/', authMiddleware, controller.getBBPackagesV2);
>>>>>>> dev

module.exports = router;

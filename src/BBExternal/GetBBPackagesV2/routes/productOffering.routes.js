// routes/bbExternal.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/productOffering.controller');
<<<<<<< HEAD
const authMiddleware = require("../../../middleware/authMiddleware");



// GetBBPackagesV2
router.get('/', authMiddleware, controller.getBBPackagesV2);
=======
const authMiddleware = require('../middlewares/auth.middleware');

router.get(
  '/BBExternal/GetBBPackagesv2',
  authMiddleware,
  controller.getBBPackagesV2
);
>>>>>>> main

module.exports = router;

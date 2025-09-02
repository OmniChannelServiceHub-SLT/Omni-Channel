const express = require('express');
const router = express.Router();
const usageController = require('../controllers/usageController');

router.get('/', usageController.list);
router.get('/:id', usageController.getById);

module.exports = router;



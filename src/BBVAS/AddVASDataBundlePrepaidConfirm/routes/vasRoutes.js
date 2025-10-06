const express = require('express');
const router = express.Router();
const vasController = require('../controllers/vasController');

router.post('/AddVASDataBundlePrepaidConfirm', vasController.addVASDataBundlePrepaidConfirm);

module.exports = router;
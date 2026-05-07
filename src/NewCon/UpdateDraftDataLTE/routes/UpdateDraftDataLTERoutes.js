const express = require('express');
const router = express.Router();
const UpdateDraftDataLTEController = require('../controllers/UpdateDraftDataLTEController');

router.post('/NewCon/UpdateDraftDataLTE', UpdateDraftDataLTEController.updateDraftDataLTE);

module.exports = router;
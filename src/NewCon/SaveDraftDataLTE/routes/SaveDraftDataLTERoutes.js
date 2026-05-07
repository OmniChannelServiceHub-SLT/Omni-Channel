const express = require('express');
const router = express.Router();
const SaveDraftDataLTEController = require('../controllers/SaveDraftDataLTEController');

router.post('/NewCon/SaveDraftDataLTE', SaveDraftDataLTEController.saveDraftDataLTE);

module.exports = router;
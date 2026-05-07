const express = require('express');
const router = express.Router();
const SaveDraftDataController = require('../controllers/SaveDraftDataController');

router.post('/NewCon/SaveDraftData', SaveDraftDataController.saveDraftData);

module.exports = router;
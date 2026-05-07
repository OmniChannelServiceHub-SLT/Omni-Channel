const express = require('express');
const router = express.Router();
const UpdateDraftDataV2Controller = require('../controllers/UpdateDraftDataV2Controller');

router.post('/NewCon/UpdateDraftDataV2', UpdateDraftDataV2Controller.updateDraftDataV2);

module.exports = router;
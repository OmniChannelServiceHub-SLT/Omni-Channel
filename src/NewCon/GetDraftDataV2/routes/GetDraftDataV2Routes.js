const express = require('express');
const router = express.Router();
const GetDraftDataV2Controller = require('../controllers/GetDraftDataV2Controller');

router.get('/NewCon/GetDraftDataV2', GetDraftDataV2Controller.getDraftDataV2);

module.exports = router;
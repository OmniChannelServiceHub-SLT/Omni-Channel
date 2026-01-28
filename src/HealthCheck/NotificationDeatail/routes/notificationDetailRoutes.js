const express = require('express');
const router = express.Router();
const { getNotificationDetails } = require('../controllers/notificationDetailController');

router.get('/NotificationDetails', getNotificationDetails);

module.exports = router;

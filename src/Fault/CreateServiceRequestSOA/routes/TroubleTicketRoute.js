// src/Fault/CreateServiceRequestSOA/routes/TroubleTicketRoute.js
const express = require('express');
const router = express.Router();
const troubleTicketController = require('../controllers/TroubleTicketController');

router.post('/v5/troubleTicket', troubleTicketController.createTroubleTicket);

module.exports = router;

// src/Fault/CreateServiceRequestSOA/controllers/TroubleTicketController.js
const troubleTicketService = require('../services/TroubleTicketService');

exports.createTroubleTicket = async (req, res) => {
  try {
    const troubleTicket = await troubleTicketService.createTroubleTicket(req.body);
    res.status(201).json(troubleTicket);
  } catch (err) {
    console.error("Error in controller:", err.message);
    res.status(500).json({ error: "Failed to create TroubleTicket" });
  }
};



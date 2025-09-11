const Customer = require("../models/Customer");
const Service = require("../models/Service");
const PartyRole = require("../models/PartyRole");

exports.validateDataGiftSub = async (req, res) => {
  try {
    const { subscriberId } = req.params;
    const { giftId, sponsorId } = req.query;

    // Step 1: Validate customer
    const customer = await Customer.findOne({ id: subscriberId });
    if (!customer || customer.status !== "Approved") {
      return res.status(404).json({ message: "Invalid or inactive subscriber" });
    }

    // Step 2: Validate service
    const service = await Service.findOne({ id: giftId });
    if (!service || service.state !== "active") {
      return res.status(400).json({ message: "Invalid or inactive DataGift service" });
    }

    // Step 3: Validate sponsor role
    const sponsor = await PartyRole.findOne({ id: sponsorId, role: "Sponsor" });
    if (!sponsor) {
      return res.status(400).json({ message: "Invalid sponsor role" });
    }

    // Success
    return res.json({
      status: "success",
      subscriber: customer,
      service,
      sponsor
    });

  } catch (err) {
    return res.status(500).json({ message: "Validation failed", error: err.message });
  }
};

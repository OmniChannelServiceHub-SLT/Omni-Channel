// controllers/dataGiftController.js
const DataGiftEnrollPrepaidConfirm = require("../models/DataGiftEnrollPrepaidConfirm");

// POST /tmf-api/serviceActivation/v4/DataGiftEnrollPrepaidConfirm
exports.confirmPrepaidDataGift = async (req, res) => {
  try {
    const { serviceId, confirmationCode, relatedParty, validFor } = req.body;

    if (!serviceId || !confirmationCode) {
      return res.status(400).json({ error: "serviceId and confirmationCode are required" });
    }

    const confirmDoc = new DataGiftEnrollPrepaidConfirm({
      serviceId,
      confirmationCode,
      relatedParty,
      validFor,
      status: "confirmed",
    });

    await confirmDoc.save();

    res.status(201).json({
      id: confirmDoc._id,
      status: confirmDoc.status,
      service: {
        id: confirmDoc.serviceId,
        state: "active"   // assumed after confirm
      },
      eventTime: confirmDoc.eventTime,
      "@type": "DataGiftEnrollPrepaidConfirm"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const DataGiftEnrollInit = require("../model/dataGiftEnrollInit.model");

exports.createDataGiftEnrollInit = async (req, res) => {
  try {
    const { packageId, reciever, channel, url } = req.body;
    const subscriberId = req.headers['subscriber-id'] || req.headers['subscriberid'];

    if (!subscriberId) {
      return res.status(400).json({ 
        code: "400", 
        reason: "Missing subscriber ID in header" 
      });
    }

    if (!packageId || !reciever || !channel || !url) {
      return res.status(400).json({ 
        code: "400", 
        reason: "Missing required fields: packageId, reciever, channel, or url" 
      });
    }

    const newEnrollment = new DataGiftEnrollInit({
      subscriberId,
      packageId,
      reciever,
      channel,
      url
    });

    await newEnrollment.save();

    return res.status(201).json({
      code: "201",
      message: "DataGift Enrollment Initialization created successfully",
      data: newEnrollment
    });
  } catch (err) {
    console.error("Error creating DataGift Enrollment Init:", err.message);
    return res.status(500).json({ 
      code: "500", 
      reason: "Internal Server Error", 
      message: err.message 
    });
  }
};


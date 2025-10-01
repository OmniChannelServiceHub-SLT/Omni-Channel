const DataGiftEnrollment = require("../models/dataGiftModel");

exports.createDataGiftEnrollment = async (req, res) => {
  try {
    const { subscriber, receiver, service, channel, url } = req.body;

    // Validate top-level fields
    if (!subscriber?.id || !subscriber?.name || !subscriber?.status || !subscriber?.relatedParty?.id) {
      return res.status(400).json({ code: "400", reason: "Missing subscriber mandatory attributes" });
    }
    if (!receiver?.id || !receiver?.role || !receiver?.engagedParty?.id) {
      return res.status(400).json({ code: "400", reason: "Missing receiver mandatory attributes" });
    }
    if (!service?.id || !service?.state || !service?.serviceSpecification?.id || !service?.serviceSpecification?.name) {
      return res.status(400).json({ code: "400", reason: "Missing service mandatory attributes" });
    }
    if (!channel || !url) {
      return res.status(400).json({ code: "400", reason: "Missing channel or url" });
    }

    // Save new enrollment
    const newEnrollment = new DataGiftEnrollment({ subscriber, receiver, service, channel, url });
    await newEnrollment.save();

    return res.status(201).json({
      code: "201",
      message: "DataGift Enrollment created successfully",
      enrollment: newEnrollment
    });
  } catch (err) {
    console.error("Error creating DataGiftEnrollment:", err.message);
    return res.status(500).json({ code: "500", reason: "Internal Server Error", message: err.message });
  }
};

const UnsubscribeAdvancedReports = require(
  "../models/UnsubscribeAdvancedReports.model"
);

/**
 * POST - Unsubscribe Advanced Reports
 */
exports.unsubscribeAdvancedReports = async (req, res) => {
  try {
   
    const body = req.body || {};

    const { activatedBy } = body;

    if (!activatedBy) {
      return res.status(400).json({
        success: false,
        message: "activatedBy is required",
        debug: {
          receivedBody: req.body,
          contentType: req.headers["content-type"]
        }
      });
    }

    const savedRecord = await UnsubscribeAdvancedReports.create({
      activatedBy
    });

    return res.status(201).json({
      success: true,
      message: "Advanced Reports unsubscribed successfully",
      data: savedRecord
    });
  } catch (error) {
    console.error("Unsubscribe Advanced Reports Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

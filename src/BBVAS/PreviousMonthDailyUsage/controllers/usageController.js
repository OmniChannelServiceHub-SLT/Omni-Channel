const Usage = require("../models/usageModel");

exports.getPreviousMonthsDailyUsage = async (req, res) => {
  try {
    const { subscriberID, billDate, monthIndex } = req.query;

    if (!subscriberID || !billDate || !monthIndex) {
      return res
        .status(400)
        .json({ error: "Missing required query parameters" });
    }
    const usages = await Usage.find({ "relatedParty.id": subscriberID });
    const response = usages.map((usage) => usage.toTMF635());
    res.json({
      resourceType: "UsageList",
      subscriberID,
      billDate,
      monthIndex,
      usage: response,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

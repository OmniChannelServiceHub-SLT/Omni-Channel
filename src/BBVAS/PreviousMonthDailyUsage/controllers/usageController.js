const Usage = require("../model/usageModel");

exports.getPreviousMonthsDailyUsage = async (req, res) => {
  try {
    const { subscriberID, billDate, monthIndex } = req.query;

    if (!subscriberID || !billDate || !monthIndex) {
      return res
        .status(400)
        .json({ error: "Missing required query parameters" });
    }
    const usages = await Usage.find({
      description: subscriberID,
    });
    const response = usages.map((usage) => usage.toTMF635());

    res.json({
      subscriberID,
      billDate,
      monthIndex,
      usage: response,
    });
  } catch (error) {
    console.error("Error fetching usage:", error);
    res.status(500).json({ error: "Server error" });
  }
};

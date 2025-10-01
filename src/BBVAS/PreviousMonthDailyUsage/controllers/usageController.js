const Usage = require("../models/usageModel");
const { nanoid } = require("nanoid"); // unique ID generate karanna

// 🔹 GET usages (by id or subscriber & month)
exports.getPreviousMonthsDailyUsage = async (req, res) => {
  try {
    const { subscriberID, billDate, monthIndex, id, fields } = req.query;

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

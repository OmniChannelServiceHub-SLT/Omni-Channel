const Usage = require("../models/usageModel");

exports.listUsages = async (req, res) => {
  try {
    const usages = await Usage.find();
    res.status(200).json(usages.map((u) => u.toTMF635()));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.retrieveUsage = async (req, res) => {
  try {
    const usage = await Usage.findById(req.params.id);
    if (!usage) return res.status(404).json({ message: "Usage not found" });

    res.status(200).json(usage.toTMF635());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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

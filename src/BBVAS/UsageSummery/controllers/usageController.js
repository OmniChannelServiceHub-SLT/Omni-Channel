const Usage = require("../models/usageModel");

exports.retrieveUsage = async (req, res) => {
  try {
    const usage = await Usage.findById(req.params.id);
    if (!usage) return res.status(404).json({ message: "Usage not found" });

    res.status(200).json(usage.toTMF635());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

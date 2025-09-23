const Usage = require("../models/summeryModel");
const { nanoid } = require("nanoid");

exports.getUsageSummary = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: "id is required" });

    const usage = await Usage.findById(id);
    if (!usage) return res.status(404).json({ error: "Usage not found", id });

    return res.status(200).json(usage.toTMF635());
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

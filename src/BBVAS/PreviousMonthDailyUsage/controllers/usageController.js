const Usage = require("../models/usageModel");
const { nanoid } = require("nanoid"); // unique ID generate karanna

// 🔹 GET usages (by id or subscriber & month)
exports.getPreviousMonthsDailyUsage = async (req, res) => {
  try {
    const { subscriberID, billDate, monthIndex, id, fields } = req.query;

    // 🔹 GET by id
    if (id) {
      const usage = await Usage.findOne({ id });
      if (!usage) {
        return res.status(404).json({ error: "Usage not found" });
      }

      let usageObj = usage.toTMF635();

      // 🔹 Filter fields if requested
      if (fields) {
        const selected = {};
        fields.split(",").forEach((f) => {
          if (usageObj[f] !== undefined) selected[f] = usageObj[f];
        });
        usageObj = selected;
      }

      return res.status(200).json(usageObj);
    }

    // 🔹 Validate required query params
    if (!subscriberID || !billDate || !monthIndex) {
      return res
        .status(400)
        .json({ error: "Missing required query parameters" });
    }

    const billDateObj = new Date(billDate);
    const monthStart = new Date(
      billDateObj.getFullYear(),
      billDateObj.getMonth() - monthIndex + 1,
      1
    );
    const monthEnd = new Date(
      billDateObj.getFullYear(),
      billDateObj.getMonth() - monthIndex + 2,
      0,
      23,
      59,
      59
    );
    const usages = await Usage.find({
      "relatedParty.id": subscriberID,
      usageDate: { $gte: monthStart, $lte: monthEnd },
    });

    const response = usages.map((u) => u.toTMF635());

    return res.json({
      isSuccess: true,
      errorMessege: null,
      exceptionDetail: null,
      dataBundle: {
        dailylist: response,
        showSingleColumn: true,
        showFourColumns: false,
        previousmonths: null,
      },
      errorShow: null,
      errorCode: null,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      isSuccess: false,
      errorMessege: "Server error",
      exceptionDetail: err.message,
      dataBundle: null,
      errorShow: null,
      errorCode: 500,
    });
  }
};

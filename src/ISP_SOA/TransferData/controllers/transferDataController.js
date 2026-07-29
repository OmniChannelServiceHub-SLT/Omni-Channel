const transferDataService = require("../services/transferDataService");

exports.transferData = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        "@type": "Error",
        code: "400",
        reason: "Request body is required.",
      });
    }

    const result = await transferDataService.transferData(req.body);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      "@type": "Error",
      code: "500",
      reason: error.message,
    });
  }
};
const {
  validateDataGiftSub,
} = require("../services/validateDataGiftSubService");

const validateDataGiftSubRequest = async (req, res) => {
  try {
    const result = await validateDataGiftSub(req.query);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    console.error("ValidateDataGiftSub Error:", error);

    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  validateDataGiftSubRequest,
};
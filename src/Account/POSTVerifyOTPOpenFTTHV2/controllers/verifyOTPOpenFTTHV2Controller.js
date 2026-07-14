const {
  verifyOTPOpenFTTHV2,
} = require("../services/verifyOTPOpenFTTHV2Service");

const verifyOTPOpenFTTHV2Request = async (req, res) => {
  try {
    const result = await verifyOTPOpenFTTHV2(req.body);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    console.error("VerifyOTPOpenFTTHV2 Error:", error);

    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  verifyOTPOpenFTTHV2Request,
};
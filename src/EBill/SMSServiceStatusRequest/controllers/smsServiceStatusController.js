const { checkSMSServiceStatus } = require("../services/smsServiceStatusService");

const smsServiceStatusRequest = async (req, res) => {
  try {
    let { accountNo, tpNo } = req.query;

    accountNo = accountNo ? accountNo.trim() : "";
    tpNo = tpNo ? tpNo.trim() : "";

    if (!accountNo || !tpNo) {
      return res.status(400).json({
        isSuccess: false,
        errorMessage: "accountNo and tpNo are required"
      });
    }

    const result = await checkSMSServiceStatus(accountNo, tpNo);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    console.error("SMSServiceStatusRequest error:", error);
    return res.status(500).json({
      isSuccess: false,
      errorMessage: "Internal Server Error"
    });
  }
};

module.exports = { smsServiceStatusRequest };
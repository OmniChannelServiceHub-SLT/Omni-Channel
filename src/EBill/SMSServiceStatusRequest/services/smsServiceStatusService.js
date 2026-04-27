const CustomerBillManagement = require("../../../models/TMF678_CustomerBillManagement");

const checkSMSServiceStatus = async (accountNo, tpNo) => {
  try {
    const cleanAccountNo = accountNo.trim();
    const cleanTpNo = tpNo.trim();

    console.log("Searching SMS service status with:");
    console.log("accountNo:", cleanAccountNo);
    console.log("tpNo:", cleanTpNo);

    const record = await CustomerBillManagement.findOne({
      accountNo: cleanAccountNo,
      tpNo: cleanTpNo
    });

    if (!record) {
      return {
        isSuccess: false,
        statusCode: 404,
        errorMessage: "SMS service status record not found"
      };
    }

    return {
      isSuccess: true,
      statusCode: 200,
      accountNo: record.accountNo,
      tpNo: record.tpNo,
      smsServiceStatus: record.smsServiceStatus,
      status: record.status
    };
  } catch (error) {
    console.error("checkSMSServiceStatus error:", error);
    return {
      isSuccess: false,
      statusCode: 500,
      errorMessage: "Database error"
    };
  }
};

module.exports = { checkSMSServiceStatus };
const verifyOTPOpenFTTHV2 = async (body = {}) => {
  const { mobileNo, otp } = body;

  if (!mobileNo || !otp) {
    return {
      success: false,
      statusCode: 400,
      message: "mobileNo and otp are required",
    };
  }

  // Dummy OTP Validation

  if (otp !== "123456") {
    return {
      success: false,
      statusCode: 401,
      message: "Invalid OTP",
    };
  }

  return {
    success: true,
    statusCode: 200,
    message: "OTP verified successfully",
    data: {
      mobileNo,
      verified: true,
      customerType: "FTTH",
      status: "ACTIVE",
    },
  };
};

module.exports = {
  verifyOTPOpenFTTHV2,
};
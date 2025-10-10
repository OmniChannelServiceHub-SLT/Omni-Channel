const OtpAuth = require('../models/otpAuth.model');

exports.validateOtp = async (econtact, otpCode) => {
  const otpRecord = await OtpAuth.findOne({ econtact, otpCode });

  if (!otpRecord) {
    return { success: false, message: 'Invalid OTP or contact' };
  }

  otpRecord.status = 'Verified';
  await otpRecord.save();

  return { success: true, message: 'OTP verified successfully', otpRecord };
};

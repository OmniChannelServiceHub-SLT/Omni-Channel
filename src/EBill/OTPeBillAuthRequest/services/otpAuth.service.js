const OtpAuth = require('../models/otpAuth.model');

class OtpAuthService {
  async validateOtp(econtact, otpCode) {
    if (!econtact || !otpCode) {
      throw new Error('Missing econtact or otpCode');
    }

    const otpRecord = await OtpAuth.findOne({ econtact, otpCode });
    if (!otpRecord) {
      return { success: false, message: 'Invalid or expired OTP' };
    }

    return { success: true, message: 'OTP verified successfully' };
  }
}

module.exports = new OtpAuthService();

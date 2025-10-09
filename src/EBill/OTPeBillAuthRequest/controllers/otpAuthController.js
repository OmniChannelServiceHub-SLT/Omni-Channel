const otpAuthService = require('../services/otpAuth.service');

exports.validateOtp = async (req, res) => {
  try {
    const { econtact, otpCode } = req.query; // from query params
    const result = await otpAuthService.validateOtp(econtact, otpCode);

    if (!result.success) {
      return res.status(401).json(result);
    }

    res.json(result);
  } catch (err) {
    console.error('Error in OTP validation:', err.message);
    res.status(400).json({ error: err.message });
  }
};

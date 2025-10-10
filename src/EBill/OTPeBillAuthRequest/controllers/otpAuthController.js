const otpAuthService = require('../services/otpAuth.service');

exports.OTPeBillAuthRequest = async (req, res) => {
  try {
    // ✅ Read from body instead of query
    const { econtact, otpCode } = req.body;

    if (!econtact || !otpCode) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: econtact or otpCode'
      });
    }

    const result = await otpAuthService.validateOtp(econtact, otpCode);

    if (!result.success) {
      return res.status(401).json(result);
    }

    res.status(200).json({
      success: true,
      message: 'OTPeBillAuthRequest processed successfully',
      data: result.otpRecord
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const mongoose = require('mongoose');

const OtpAuthSchema = new mongoose.Schema({
  econtact: { type: String, required: true },
  otpCode: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 } // OTP expires in 5 min
});

module.exports = mongoose.model('OtpAuth', OtpAuthSchema);

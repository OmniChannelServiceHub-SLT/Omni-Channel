const mongoose = require('mongoose');

const otpAuthSchema = new mongoose.Schema({
  econtact: { type: String, required: true },
  otpCode: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Verified', 'Expired'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('OtpAuth', otpAuthSchema);

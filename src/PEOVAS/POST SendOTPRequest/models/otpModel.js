const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  // Mandatory TMF Resource Attributes [cite: 31, 84]
  id: { type: String, required: true },
  href: { type: String, required: true },
  '@type': { type: String, default: 'OTPRequest' },
  '@baseType': { type: String, default: 'Task' },
  
  // Exact TMF PhoneContactMedium Structure 
  contactMedium: [{
    '@type': { type: String, default: 'PhoneContactMedium' },
    contactType: { type: String, default: 'mobile' },
    preferred: { type: Boolean, default: true },
    phoneNumber: { type: String, required: true } // Mapped from MSISDN
  }],

  // Task Attributes with TMF-Compliant names
  status: { type: String, default: 'initialized' },
  otp: { type: String }, // Internal use for validation
  validFor: {
    startDateTime: { type: Date, default: Date.now },
    endDateTime: { type: Date }
  }
});

module.exports = mongoose.model('OTPRequest', otpSchema);
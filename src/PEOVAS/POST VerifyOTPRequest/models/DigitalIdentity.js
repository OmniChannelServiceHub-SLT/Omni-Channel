const mongoose = require('mongoose');

// TMF720: Digital Identity Resource
// Mandatory attributes: id, status
const digitalIdentitySchema = new mongoose.Schema({
  // TMF ID (often UUID)
  id: {
    type: String,
    required: true,
    unique: true
  },
  // Mandatory: Active, Inactive, Suspended
  status: {
    type: String,
    required: true,
    default: 'Active'
  },
  // Linking to the user/party
  party: [{
    id: String,
    name: String,
    href: String
  }],
  // Credentials (OTPs, Passwords)
  credential: [{
    token: String, // The OTP Code
    validFor: {
      startDateTime: Date,
      endDateTime: Date
    },
    status: String // 'active', 'expired'
  }]
});

module.exports = mongoose.model('DigitalIdentity', digitalIdentitySchema);
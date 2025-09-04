const mongoose = require('mongoose');

const contactMediumSchema = new mongoose.Schema({
  mediumType: { type: String, required: true },
  value: { type: String, required: true },
  characteristic: {
    type: Object,
    default: {}
  }
});

const customerSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  fullName: { type: String },
  contactMedium: [contactMediumSchema],
  
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
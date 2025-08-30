const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  name: String,
  category: String,
  description: String,
  serviceSpecification: {
    id: String,
    name: String
  },
  relatedParty: [{
    id: String,
    name: String,
    role: String,
    '@referredType': String
  }],
  serviceCharacteristic: [{
    id: String,
    name: String,
    valueType: String,
    value: mongoose.Schema.Types.Mixed
  }],
  state: {
    type: String,
    enum: ["feasabilityChecked","designed","reserved","inactive","active","terminated"],
    default: "active"
  },
  startDate: Date,
  endDate: Date
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);

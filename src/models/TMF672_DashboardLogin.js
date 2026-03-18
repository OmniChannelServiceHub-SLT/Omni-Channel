const mongoose = require('mongoose');

const TMF672_DashboardLoginSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, unique: true },
    privilege: { type: Number, required: true },
    description: { type: String },
    password: { type: String },
    email: { type: String },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
    "@type": { type: String, default: "DashboardLogin" },
    "@schemaLocation": { type: String }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model('TMF672_DashboardLogin', TMF672_DashboardLoginSchema);

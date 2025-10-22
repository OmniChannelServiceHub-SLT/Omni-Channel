// models/CustomerBillOnDemand.js
const mongoose = require("mongoose");

const CustomerBillOnDemandSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  href: { type: String },
  description: { type: String },
  name: { type: String },
  lastUpdate: { type: Date, default: Date.now },
  state: {
    type: String,
    enum: ["inProgress", "done", "rejected", "terminatedWithError"],
    default: "inProgress",
  },
  billingAccount: {
    id: { type: String, required: true },
    href: { type: String },
    name: { type: String },
    "@referredType": { type: String },
    "@type": { type: String },
  },
  relatedParty: {
    role: { type: String },
    "@type": { type: String },
    partyOrPartyRole: {
      id: { type: String },
      name: { type: String },
      "@referredType": { type: String },
      "@type": { type: String },
    },
  },
  characteristic: [
    {
      name: { type: String },
      value: { type: mongoose.Schema.Types.Mixed },
    },
  ],
  "@type": { type: String, default: "CustomerBillOnDemand" },
});

module.exports = mongoose.model("CustomerBillOnDemand", CustomerBillOnDemandSchema);

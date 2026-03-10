const mongoose = require("mongoose");

const billingAccountSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: String,
    status: String,
    accountType: String,
    relatedParty: [
      {
        id: String,
        role: String
      }
    ],
    characteristic: [
      {
        name: String,
        value: String
      }
    ]
  },
  { strict: false }
);

module.exports = mongoose.model("BillingAccount", billingAccountSchema);

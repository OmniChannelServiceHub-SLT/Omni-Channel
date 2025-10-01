const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    givenName: String,
    familyName: String,
    status: String,
    contactMedium: [
      {
        type: { type: String },
        preferred: Boolean,
        characteristic: {
          emailAddress: String,
          number: String
        }
      }
    ]
  },
  { strict: false }
);

module.exports = mongoose.models.Customer || mongoose.model("Customer", customerSchema);

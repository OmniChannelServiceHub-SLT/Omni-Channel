const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  status: String, // e.g. Approved, Active
  engagedParty: {
    id: String,
    name: String,
    type: String // Individual, Organization
  },
  contactMedium: [
    {
      contactType: String,
      phoneNumber: String,
      emailAddress: String
    }
  ]
});

module.exports = mongoose.model("Customer", CustomerSchema);

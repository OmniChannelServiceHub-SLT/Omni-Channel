const mongoose = require("mongoose");

const EngagedPartySchema = new mongoose.Schema({
  id: String,
  name: String,
  type: String // Individual, Organization
}, { _id: false });

const ContactMediumSchema = new mongoose.Schema({
  contactType: String,
  phoneNumber: String,
  emailAddress: String
}, { _id: false });

const CustomerSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  status: String, // e.g. Approved, Active
  engagedParty: EngagedPartySchema,
  contactMedium: [ContactMediumSchema]
});

module.exports = mongoose.models.Customer || mongoose.model("Customer", CustomerSchema);


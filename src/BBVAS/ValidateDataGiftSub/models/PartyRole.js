const mongoose = require("mongoose");

const EngagedPartySchema = new mongoose.Schema({
  id: String,
  name: String,
  type: String
}, { _id: false });

const PartyRoleSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  role: String, // Sponsor / Customer / User
  engagedParty: EngagedPartySchema
});

// Prevent OverwriteModelError
module.exports = mongoose.models.PartyRole || mongoose.model("PartyRole", PartyRoleSchema);

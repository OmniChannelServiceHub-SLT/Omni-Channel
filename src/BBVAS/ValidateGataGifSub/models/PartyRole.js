const mongoose = require("mongoose");

const PartyRoleSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  role: String, // Sponsor / Customer / User
  engagedParty: {
    id: String,
    name: String,
    type: String
  }
});

module.exports = mongoose.model("PartyRole", PartyRoleSchema);

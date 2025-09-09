const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  state: String, // active, inactive, reserved
  serviceSpecification: {
    id: String,
    name: String,
    type: String
  },
  relatedParty: [
    {
      id: String,
      name: String,
      role: String // e.g., Customer, Sponsor
    }
  ]
});

module.exports = mongoose.model("Service", ServiceSchema);

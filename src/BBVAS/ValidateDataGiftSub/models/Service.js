const mongoose = require("mongoose");

const ServiceSpecificationSchema = new mongoose.Schema({
  id: String,
  name: String,
  type: String
}, { _id: false });

const RelatedPartySchema = new mongoose.Schema({
  id: String,
  name: String,
  role: String // Customer, Sponsor
}, { _id: false });

const ServiceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  state: String, // active, inactive, reserved
  serviceSpecification: ServiceSpecificationSchema,
  relatedParty: [RelatedPartySchema]
});

module.exports = mongoose.models.Service || mongoose.model("Service", ServiceSchema);

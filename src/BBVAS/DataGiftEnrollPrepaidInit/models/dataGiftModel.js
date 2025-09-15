const mongoose = require("mongoose");

const DataGiftEnrollmentSchema = new mongoose.Schema({
  subscriber: {
    id: { type: String, required: true },       // TMF629
    name: { type: String, required: true },
    status: { type: String, required: true },   // e.g., active, suspended
    relatedParty: {
      id: { type: String, required: true },     // PartyRole reference
      role: { type: String, required: true },
      "@type": { type: String, required: true, default: "PartyRole" }
    }
  },
  receiver: {
    id: { type: String, required: true },       // TMF669
    role: { type: String, required: true },
    name: { type: String, required: true },
    "@type": { type: String, required: true, default: "PartyRole" },
    engagedParty: {
      id: { type: String, required: true },
      name: { type: String, required: true },
      "@type": { type: String, required: true, default: "Individual" }
    }
  },
  service: {
    id: { type: String, required: true },       // TMF640
    state: { type: String, required: true },
    serviceSpecification: {
      id: { type: String, required: true },
      name: { type: String, required: true },
      "@type": { type: String, default: "ServiceSpecification" },
      "@referredType": { type: String, default: "ServiceSpecification" }
    },
    serviceCharacteristic: [
      {
        name: { type: String, required: true },
        value: { type: String, required: true }
      }
    ]
  },
  channel: { type: String, required: true },
  url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("DataGiftEnrollment", DataGiftEnrollmentSchema);

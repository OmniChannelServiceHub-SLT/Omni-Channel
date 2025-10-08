const mongoose = require("mongoose");

const usageCharacteristicSchema = new mongoose.Schema({
  name: String,
  value: mongoose.Schema.Types.Mixed,
  valueType: String,
});

const relatedPartySchema = new mongoose.Schema({
  id: String,
  href: String,
  role: String,
  name: String,
  "@referredType": String,
});

const usageSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // string id
  usageDate: { type: Date, default: Date.now, required: true },
  description: { type: String, required: true },
  usageType: { type: String, required: true },
  status: { type: String, default: "received", required: true },
  usageCharacteristic: [usageCharacteristicSchema],
  relatedParty: [relatedPartySchema],
  usageSpecification: {
    id: { type: String, default: "spec-001", required: true },
    href: {
      type: String,
      default: function() {
        return `http://localhost:3000/tmf-api/usageManagement/v4/usageSpecification/${this.id}`;
      },
      required: true
    },
    name: { type: String, default: "UsageSummarySpec", required: true },
    "@referredType": { type: String, default: "UsageSpecification", required: true },
  },
  "@type": { type: String, default: "Usage", required: true },
  "@baseType": { type: String, default: "Entity", required: true },
  "@schemaLocation": { 
    type: String,
    default: "http://localhost:3000/tmf-api/schema/Usage/Usage.schema.json",
    required: true
  }
});

usageSchema.methods.toTMF635 = function (baseUrl = 'http://localhost:3000') {
  return {
    id: this._id,
    href: `${baseUrl}/tmf-api/usageManagement/v4/usage/${this._id}`,
    usageDate: this.usageDate,
    description: this.description,
    usageType: this.usageType,
    status: this.status,
    usageCharacteristic: this.usageCharacteristic?.map((uc) => ({
      name: uc.name,
      value: uc.value,
      valueType: uc.valueType,
    })),
    relatedParty: this.relatedParty?.map((rp) => ({
      id: rp.id,
      href: rp.href,
      role: rp.role,
      name: rp.name,
      "@referredType": rp["@referredType"],
    })),
    usageSpecification: this.usageSpecification,
  };
};

module.exports = mongoose.model("Summery", usageSchema);

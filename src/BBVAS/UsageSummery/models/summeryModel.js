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
  usageDate: { type: Date, default: Date.now },
  description: { type: String, required: true },
  usageType: { type: String, required: true },
  status: { type: String, default: "received" },
  usageCharacteristic: [usageCharacteristicSchema],
  relatedParty: [relatedPartySchema],
  usageSpecification: {
    id: { type: String, default: "spec-001" },
    href: {
      type: String,
      default:
        "http://localhost:3000/tmf-api/usageManagement/v4/usageSpecification/spec-001",
    },
    name: { type: String, default: "UsageSummarySpec" },
    "@referredType": { type: String, default: "UsageSpecification" },
  },
});

usageSchema.methods.toTMF635 = function () {
  return {
    id: this._id,
    href: `http://localhost:3000/tmf-api/usageManagement/v4/usage/${this._id}`,
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

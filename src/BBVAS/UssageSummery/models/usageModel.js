const mongoose = require("mongoose");

const usageSchema = new mongoose.Schema({
  usageDate: { type: Date, default: Date.now },
  description: String,
  usageType: String,
  status: { type: String, default: "received" },
  volume: Number,
  unit: String,
});

usageSchema.methods.toTMF635 = function () {
  return {
    id: this._id,
    href: `http://localhost:5000/tmf-api/usageManagement/v4/usage/${this._id}`,
    usageDate: this.usageDate,
    description: this.description,
    usageType: this.usageType,
    status: this.status,
    usageCharacteristic: [
      { name: "volume", value: this.volume, valueType: "number" },
      { name: "unit", value: this.unit, valueType: "string" },
    ],
    usageSpecification: {
      id: "spec-001",
      href: "http://localhost:5000/tmf-api/usageManagement/v4/usageSpecification/spec-001",
      name: "UsageSummarySpec",
      "@referredType": "UsageSpecification",
    },
  };
};

module.exports = mongoose.model("Usage", usageSchema);

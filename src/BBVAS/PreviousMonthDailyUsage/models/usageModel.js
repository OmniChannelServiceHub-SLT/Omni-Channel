const mongoose = require("mongoose");

const usageCharacteristicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
  valueType: { type: String },
});

const relatedPartySchema = new mongoose.Schema({
  id: { type: String, required: true },
  href: { type: String },
  role: { type: String, required: true },
  name: { type: String },
  "@referredType": { type: String },
});

const usageSpecificationSchema = new mongoose.Schema({
  id: { type: String, default: "spec-001" },
  href: {
    type: String,
    default:
      "http://localhost:5000/tmf-api/usageManagement/v4/usageSpecification/spec-001",
  },
  name: { type: String, default: "UsageSummarySpec" },
  version: { type: String, default: "v1.0" },
});

const usageSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    href: {
      type: String,
      default: function () {
        return `http://localhost:5000/tmf-api/usageManagement/v4/usage/${this.id}`;
      },
    },
    description: { type: String },
    status: {
      type: String,
      enum: ["received", "processed", "rejected", "pending"],
      default: "received",
    },
    usageDate: { type: Date, required: true },
    usageType: { type: String },
    usageCharacteristic: [usageCharacteristicSchema],
    usageSpecification: { type: usageSpecificationSchema, default: {} },
    relatedParty: [relatedPartySchema],
    isBilled: { type: Boolean, default: false },
    ratingAmount: { type: Number, default: 0 },
    ratedProductRef: {
      id: { type: String },
      href: { type: String },
      name: { type: String },
    },
    relatedUsage: [
      {
        id: { type: String },
        href: { type: String },
      },
    ],
    "@type": { type: String, default: "Usage" },
    "@baseType": { type: String, default: "Entity" },
    "@schemaLocation": {
      type: String,
      default: function () {
        return `http://localhost:5000/tmf-api/usageManagement/v4/usage/${this.id}`;
      },
    },
  },
  { timestamps: true }
);

usageSchema.methods.toTMF635 = function () {
  return {
    id: this.id,
    href: this.href,
    description: this.description,
    status: this.status,
    usageDate: this.usageDate,
    usageType: this.usageType,
    usageCharacteristic: this.usageCharacteristic,
    usageSpecification: this.usageSpecification || {
      id: "spec-001",
      href: "http://localhost:5000/tmf-api/usageManagement/v4/usageSpecification/spec-001",
      name: "UsageSummarySpec",
      version: "v1.0",
    },
    relatedParty: this.relatedParty,
    isBilled: this.isBilled,
    ratingAmount: this.ratingAmount,
    ratedProductRef: this.ratedProductRef,
    relatedUsage: this.relatedUsage,
    "@type": this["@type"],
    "@baseType": this["@baseType"],
    "@schemaLocation": this["@schemaLocation"],
  };
};

module.exports = mongoose.model("Usage", usageSchema);

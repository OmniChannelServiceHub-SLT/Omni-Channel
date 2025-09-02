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
  id: { type: String },
  href: { type: String },
  name: { type: String },
  version: { type: String },
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
    usageSpecification: usageSpecificationSchema,
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

module.exports = mongoose.model("Usage", usageSchema);

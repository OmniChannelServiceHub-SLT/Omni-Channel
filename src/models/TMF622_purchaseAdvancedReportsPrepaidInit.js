const mongoose = require("mongoose");

const PurchaseAdvancedReportsPrepaidInitSchema = new mongoose.Schema(
  {
    subscriberID: { type: String, required: true },
    reportPackageID: { type: Number, required: true },
    requestedBy: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "initiated", "failed"],
      default: "initiated",
    },
    transactionRef: { type: String, unique: true },
    initiatedAt: { type: Date, default: Date.now },
    "@type": { type: String, default: "PurchaseAdvancedReportsPrepaidInit" },
    "@baseType": { type: String, default: "Entity" },
  },
  { timestamps: true }
);

// TMF-style response format
PurchaseAdvancedReportsPrepaidInitSchema.methods.toTMF = function () {
  return {
    id: this._id,
    href: `http://localhost:5000/tmf-api/usageManagement/v4/AdvancedReports/prepaid/init/${this._id}`,
    subscriberID: this.subscriberID,
    reportPackageID: this.reportPackageID,
    requestedBy: this.requestedBy,
    status: this.status,
    transactionRef: this.transactionRef,
    initiatedAt: this.initiatedAt,
    "@type": this["@type"],
    "@baseType": this["@baseType"],
  };
};

module.exports = mongoose.model(
  "PurchaseAdvancedReportsPrepaidInit",
  PurchaseAdvancedReportsPrepaidInitSchema
);
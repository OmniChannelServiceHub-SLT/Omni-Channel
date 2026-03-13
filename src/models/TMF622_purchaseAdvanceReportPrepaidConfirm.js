const mongoose = require("mongoose");

const PurchaseAdvancedReportsPrepaidConfirmSchema = new mongoose.Schema(
  {
    subscriberID: { type: String, required: true },
    reportPackageID: { type: Number, required: true },
    confirmedBy: { type: String, required: true },
    transactionRef: { type: String, required: true }, // must match Init transactionRef
    status: {
      type: String,
      enum: ["pending", "confirmed", "failed"],
      default: "confirmed",
    },
    confirmedAt: { type: Date, default: Date.now },
    "@type": { type: String, default: "PurchaseAdvancedReportsPrepaidConfirm" },
    "@baseType": { type: String, default: "Entity" },
  },
  { timestamps: true }
);

// TMF-style response format
PurchaseAdvancedReportsPrepaidConfirmSchema.methods.toTMF = function () {
  return {
    id: this._id,
    href: `http://localhost:5000/tmf-api/usageManagement/v4/AdvancedReports/prepaid/confirm/${this._id}`,
    subscriberID: this.subscriberID,
    reportPackageID: this.reportPackageID,
    confirmedBy: this.confirmedBy,
    transactionRef: this.transactionRef,
    status: this.status,
    confirmedAt: this.confirmedAt,
    "@type": this["@type"],
    "@baseType": this["@baseType"],
  };
};

module.exports = mongoose.model(
  "PurchaseAdvancedReportsPrepaidConfirm",
  PurchaseAdvancedReportsPrepaidConfirmSchema
);
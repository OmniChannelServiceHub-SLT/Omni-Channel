// models/DataGiftEnrollPrepaidConfirm.js
const mongoose = require("mongoose");

const DataGiftEnrollPrepaidConfirmSchema = new mongoose.Schema({
  serviceId: { type: String, required: true },
  confirmationCode: { type: String, required: true },
  status: { type: String, enum: ["pending", "confirmed", "failed"], default: "pending" },
  relatedParty: [
    {
      id: String,
      role: String,
      referredType: String,
    }
  ],
  validFor: {
    startDateTime: Date,
    endDateTime: Date,
  },
  eventTime: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("DataGiftEnrollPrepaidConfirm", DataGiftEnrollPrepaidConfirmSchema);

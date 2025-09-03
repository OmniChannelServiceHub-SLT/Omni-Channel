const mongoose = require("mongoose");

const DataGiftEnrollSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  senderId: { type: String, required: true },     // who gifts
  receiverId: { type: String, required: true },   // who receives
  bundleName: { type: String, required: true },   // e.g. "Data Gift 2GB"
  dataVolume: { type: String, required: true },   // e.g. "2GB"
  validity: { type: String, required: true },     // e.g. "7 Days"
  status: { type: String, enum: ["initiated", "success", "failed"], default: "initiated" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("DataGiftEnroll", DataGiftEnrollSchema);

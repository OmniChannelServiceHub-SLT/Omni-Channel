const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  subscriberID: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: String,
  status: { type: String, default: "active" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Customer", CustomerSchema);

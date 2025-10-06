const mongoose = require("mongoose");

const ProductOrderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
  orderType: { type: String, default: "VASBundleUnsubscription" },
  state: { type: String, default: "Acknowledged" },
  orderItems: [
    {
      productId: String,
      productName: String,
      action: { type: String, enum: ["add", "modify", "delete"], default: "delete" }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ProductOrder", ProductOrderSchema);

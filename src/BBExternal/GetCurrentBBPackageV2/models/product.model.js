const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  _id: String,                // PROD_123
  customerId: String,
  category: { type: String, default: "broadband" },
  status: String,             // Active, Suspended

  productOfferingId: {
    type: String,
    ref: "ProductOffering"
  },

  startDate: Date,

  "@type": {
    type: String,
    default: "Product"
  }
}, {
  timestamps: true
});

module.exports = mongoose.model(
  "Product",
  ProductSchema,
  "products"
);

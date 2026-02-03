const mongoose = require("mongoose");

const ProductOfferingPriceSchema = new mongoose.Schema({
  priceType: { type: String }, // recurring, oneTime
  price: {
    amount: Number,
    unit: String
  }
}, { _id: false });

const ProductSpecificationSchema = new mongoose.Schema({
  id: String,
  accessType: String,       // 4G, Fiber
  downloadSpeed: String,
  uploadSpeed: String
}, { _id: false });

const ProductOfferingSchema = new mongoose.Schema({
  _id: String,              // BB_SLT_4G_ANYTIDE
  name: String,             // Any Tide
  category: { type: String, default: "broadband" },
  offeringType: String,     // SLT 4G
  lifecycleStatus: String,  // Active, Inactive
  description: String,

  productSpecification: ProductSpecificationSchema,

  productOfferingPrice: [ProductOfferingPriceSchema],

  "@type": {
    type: String,
    default: "ProductOffering"
  }
}, {
  timestamps: true
});

module.exports = mongoose.model(
  "ProductOffering",
  ProductOfferingSchema,
  "productOfferings"
);
<<<<<<< HEAD
=======
// models/productOffering.model.js
const mongoose = require('mongoose');

const MoneySchema = new mongoose.Schema({
  value: Number,
  unit: String
}, { _id: false });

const ProductOfferingPriceSchema = new mongoose.Schema({
  name: String,
  priceType: String,
  price: {
    taxIncludedAmount: MoneySchema
  }
}, { _id: false });

const CategorySchema = new mongoose.Schema({
  id: String,
  name: String
}, { _id: false });

const ProductSpecificationRefSchema = new mongoose.Schema({
  id: String,
  href: String,
  name: String
}, { _id: false });

const ProductOfferingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lifecycleStatus: { type: String, default: "Active" },
  category: [CategorySchema],
  productSpecification: ProductSpecificationRefSchema,
  productOfferingPrice: [ProductOfferingPriceSchema]
}, { timestamps: true, collection: 'productOffering' });

module.exports =
  mongoose.models.ProductOffering ||
  mongoose.model('ProductOffering', ProductOfferingSchema);
>>>>>>> dev
=======
>>>>>>> BBExternal_GetBBPackagesV2_Tharini

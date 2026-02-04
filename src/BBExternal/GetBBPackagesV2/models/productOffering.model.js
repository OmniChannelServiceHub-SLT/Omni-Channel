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

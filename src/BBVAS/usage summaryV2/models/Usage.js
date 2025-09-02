const mongoose = require('mongoose');

const MoneySchema = new mongoose.Schema({
  value: Number,
  unit: String
}, { _id: false });

const RatedProductUsageSchema = new mongoose.Schema({
  ratingDate: Date,
  usageRatingTag: String,
  ratingAmountType: String,
  taxIncludedRatingAmount: MoneySchema,
  taxExcludedRatingAmount: MoneySchema,
  taxRate: Number,
  isTaxExempt: Boolean,
  offerTariffType: String,
  bucketValueConvertedInAmount: MoneySchema
}, { _id: false });

const RelatedPartySchema = new mongoose.Schema({
  id: String,
  href: String,
  role: String,
  '@referredType': String
}, { _id: false });

const UsageCharacteristicSchema = new mongoose.Schema({
  name: String,
  value: mongoose.Schema.Types.Mixed
}, { _id: false });

const UsageSpecificationRefSchema = new mongoose.Schema({
  id: String,
  href: String,
  name: String
}, { _id: false });

const UsageSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  href: String,
  usageDate: Date,
  usageType: String,
  status: String,
  ratedProductUsage: [RatedProductUsageSchema],
  relatedParty: [RelatedPartySchema],
  usageCharacteristic: [UsageCharacteristicSchema],
  usageSpecification: UsageSpecificationRefSchema,
  '@type': String,
  '@baseType': String,
  '@schemaLocation': String
}, {
  versionKey: false
});

module.exports = mongoose.model('Usage', UsageSchema);



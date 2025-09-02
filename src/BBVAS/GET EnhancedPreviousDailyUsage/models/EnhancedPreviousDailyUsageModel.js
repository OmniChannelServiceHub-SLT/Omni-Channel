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

const ValidForSchema = new mongoose.Schema({
  startDateTime: Date,
  endDateTime: Date
}, { _id: false });

const EnhancedPreviousDailyUsageSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  href: String,
  usageDate: { type: Date, required: true, index: true },
  usageType: String,
  status: String,
  ratedProductUsage: [RatedProductUsageSchema],
  relatedParty: [RelatedPartySchema],
  usageCharacteristic: [UsageCharacteristicSchema],
  usageSpecification: UsageSpecificationRefSchema,
  validFor: ValidForSchema,
  billDate: { type: Date, index: true }, // For backward compatibility
  monthIndex: { type: Number, index: true }, // For backward compatibility
  subscriberID: { type: String, index: true }, // For backward compatibility
  '@type': String,
  '@baseType': String,
  '@schemaLocation': String
}, {
  versionKey: false,
  timestamps: true
});

// Compound index for efficient querying of daily usage by subscriber and date
EnhancedPreviousDailyUsageSchema.index({ 'relatedParty.id': 1, usageDate: 1 });
EnhancedPreviousDailyUsageSchema.index({ subscriberID: 1, billDate: 1, monthIndex: 1 });

module.exports = mongoose.model('EnhancedPreviousDailyUsage', EnhancedPreviousDailyUsageSchema);

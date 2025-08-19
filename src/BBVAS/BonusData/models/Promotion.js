const mongoose = require('mongoose');

const EntityRefSchema = new mongoose.Schema({
  href: String,
  id: String,
  name: String,
  '@type': String,
  '@referredType': String
}, { _id: false });

const PromotionActionSchema = new mongoose.Schema({
  id: String,
  actionType: String, // e.g., "3" for data(GB)
  actionValue: String,
  actionEntityRef: EntityRefSchema
}, { _id: false });

const PromotionCriteriaSchema = new mongoose.Schema({
  id: String,
  criteriaOperator: String, // '=', '>', '<=', etc.
  criteriaParameter: String,
  criteriaValue: String
}, { _id: false });

const PromotionCriteriaGroupSchema = new mongoose.Schema({
  id: String,
  groupName: String,
  criteriaLogicalRelationship: String,
  criteria: [PromotionCriteriaSchema]
}, { _id: false });

const PromotionPatternSchema = new mongoose.Schema({
  id: String,
  description: String,
  name: String,
  priority: Number,
  validFor: {
    startDateTime: Date,
    endDateTime: Date
  },
  action: [PromotionActionSchema],
  criteriaGroup: [PromotionCriteriaGroupSchema],
  criteriaGroupLogicalRelationship: String
}, { _id: false });

const PromotionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  href: String,
  description: String,
  lastUpdate: Date,
  lifecycleStatus: {
    type: String,
    enum: ['draft', 'test', 'waitForApproval', 'release', 'suspend', 'retirement']
  },
  name: String,
  promotionType: { type: String, enum: ['Award', 'Discount', 'Reduction'] },
  validFor: {
    startDateTime: Date,
    endDateTime: Date
  },
  pattern: [PromotionPatternSchema],
  '@type': String,
  '@baseType': String,
  '@schemaLocation': String
});

module.exports = mongoose.model('Promotion', PromotionSchema);

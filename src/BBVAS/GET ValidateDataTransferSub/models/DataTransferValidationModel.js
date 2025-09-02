const mongoose = require('mongoose');

const ServiceCharacteristicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: mongoose.Schema.Types.Mixed,
  valueType: String,
  '@type': String
}, { _id: false });

const RelatedPartySchema = new mongoose.Schema({
  id: { type: String, required: true },
  href: String,
  role: { type: String, required: true, enum: ['Subscriber', 'Receiver'] },
  name: String,
  '@referredType': { type: String, default: 'PartyRole' }
}, { _id: false });

const ServiceSpecificationRefSchema = new mongoose.Schema({
  id: String,
  href: String,
  name: String,
  version: String
}, { _id: false });

const ValidForSchema = new mongoose.Schema({
  startDateTime: Date,
  endDateTime: Date
}, { _id: false });

const DataTransferValidationSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  href: String,
  name: { type: String, default: 'DataTransferValidation' },
  description: String,
  state: { 
    type: String, 
    required: true, 
    enum: ['feasibilityChecked', 'active', 'inactive', 'terminated'],
    default: 'feasibilityChecked'
  },
  serviceCharacteristic: [ServiceCharacteristicSchema],
  relatedParty: [RelatedPartySchema],
  serviceSpecification: ServiceSpecificationRefSchema,
  validFor: ValidForSchema,
  // For backward compatibility and internal tracking
  subscriberId: { type: String, index: true },
  receiverId: { type: String, index: true },
  validationDate: { type: Date, default: Date.now },
  isValid: { type: Boolean, default: true },
  '@type': { type: String, default: 'Service' },
  '@baseType': { type: String, default: 'Service' },
  '@schemaLocation': String
}, {
  versionKey: false,
  timestamps: true
});

// Indexes for efficient querying
DataTransferValidationSchema.index({ subscriberId: 1, receiverId: 1 });
DataTransferValidationSchema.index({ 'relatedParty.id': 1, 'relatedParty.role': 1 });
DataTransferValidationSchema.index({ state: 1 });
DataTransferValidationSchema.index({ validationDate: -1 });

module.exports = mongoose.model('DataTransferValidation', DataTransferValidationSchema);

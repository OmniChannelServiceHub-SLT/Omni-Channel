const mongoose = require('mongoose');

const serviceRelationshipSchema = new mongoose.Schema({
  id: String,
  href: String,
  relationshipType: {
    type: String,
    enum: ['reliesOn', 'dependency', 'bundles'],
  },
});

const relatedPartySchema = new mongoose.Schema({
  id: String,
  href: String,
  name: String,
  role: String,
});

const serviceCharacteristicSchema = new mongoose.Schema({
  name: String,
  valueType: String,
  value: mongoose.Schema.Types.Mixed,
});

const serviceSpecificationRefSchema = new mongoose.Schema({
  id: String,
  href: String,
  name: String,
});

const dataGiftPackageSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    href: String,
    category: String,
    name: String,
    description: String,
    isServiceEnabled: Boolean,
    isStateful: Boolean,
    isBundle: Boolean,
    state: {
      type: String,
      enum: ['feasibilityChecked', 'designed', 'reserved', 'active', 'inactive', 'terminated'],
    },
    serviceDate: Date,
    startDate: Date,
    endDate: Date,
    serviceSpecification: serviceSpecificationRefSchema,
    serviceCharacteristic: [serviceCharacteristicSchema],
    serviceRelationship: [serviceRelationshipSchema],
    relatedParty: [relatedPartySchema],
  },
  {
    timestamps: true,
  }
);

const DataGiftPackage = mongoose.model('DataGiftPackage', dataGiftPackageSchema);

module.exports =
  mongoose.models.DataGiftPackage ||
  mongoose.model("DataGiftPackage", dataGiftPackageSchema);
const mongoose = require('mongoose');

const SimpleNameValueSchema = new mongoose.Schema(
  {
    name: String,
    value: mongoose.Schema.Types.Mixed,
  },
  { _id: false }
);

const RelatedPartySchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    role: { type: String, default: 'owner' },
    characteristic: { type: [SimpleNameValueSchema], default: [] },
    '@type': { type: String, default: 'RelatedParty' },
  },
  { _id: false }
);

const ProductSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    productCharacteristic: { type: [SimpleNameValueSchema], default: [] },
    relatedParty: { type: [RelatedPartySchema], default: [] },
    '@type': { type: String, default: 'Product' },
  },
  { _id: false }
);

const ResourceSchema = new mongoose.Schema(
  {
    id: String,
    resourceType: String,
    serialNumber: String,
    '@type': { type: String, default: 'Resource' },
  },
  { _id: false }
);

const LocationSchema = new mongoose.Schema(
  {
    id: String,
    address1: String,
    address2: String,
    city: String,
    district: String,
    latitude: String,
    longitude: String,
    '@type': { type: String, default: 'GeographicAddress' },
  },
  { _id: false }
);

const ServiceNodeSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    state: { type: String, default: 'active' },
    serviceType: { type: String, default: 'FTTH' },
    serviceCharacteristic: { type: [SimpleNameValueSchema], default: [] },
    '@type': { type: String, default: 'Service' },
  },
  { _id: false }
);

const ServiceInventorySchema = new mongoose.Schema(
  {
    // Legacy TMF638 shape used by OmniTP lookup
    id: String,
    state: String,
    serviceSpecification: {
      id: String,
      name: String,
      '@type': String,
    },
    serviceCharacteristic: { type: [SimpleNameValueSchema], default: [] },
    '@type': { type: String, default: 'Service' },
    '@baseType': { type: String, default: 'Service' },

    // FTTH dashboard aggregate shape
    service: ServiceNodeSchema,
    product: ProductSchema,
    resources: { type: [ResourceSchema], default: [] },
    location: LocationSchema,
    serviceStatus: String,
  },
  {
    collection: 'serviceInventory',
    timestamps: true,
  }
);

module.exports =
  mongoose.models.ServiceInventory ||
  mongoose.model('ServiceInventory', ServiceInventorySchema);

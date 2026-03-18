// models/ServiceInventory.js
const mongoose = require('mongoose');

const ServiceInventorySchema = new mongoose.Schema(
  {
    id: String,
    state: String,
    serviceSpecification: {
      id: String,
      name: String,
      '@type': String
    },
    serviceCharacteristic: [
      {
        name: String,
        value: mongoose.Schema.Types.Mixed
      }
    ],
    '@type': { type: String, default: 'Service' },
    '@baseType': { type: String, default: 'Service' }
  },
  { collection: 'serviceInventory' }
);

module.exports =
  mongoose.models.ServiceInventory ||
  mongoose.model('ServiceInventory', ServiceInventorySchema);

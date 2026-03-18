const mongoose = require('mongoose');

const TMF638_FTTHFullDataSchema = new mongoose.Schema(
  {
    service: {
      id: { type: String, required: true },
      name: String,
      state: { type: String, default: 'active' },
      serviceType: { type: String, default: 'FTTH' },
      serviceCharacteristic: [
        {
          name: String,
          value: String,
        },
      ],
      "@type": { type: String, default: 'Service' },
    },
    product: {
      id: { type: String, required: true },
      name: String,
      productCharacteristic: [
        {
          name: String,
          value: String,
        },
      ],
      relatedParty: [
        {
          id: String,
          name: String,
          role: { type: String, default: 'owner' },
          characteristic: [
            {
              name: String,
              value: String,
            },
          ],
          "@type": { type: String, default: 'RelatedParty' },
        },
      ],
      "@type": { type: String, default: 'Product' },
    },
    resources: [
      {
        id: String,
        resourceType: String,
        serialNumber: String,
        "@type": { type: String, default: 'Resource' },
      },
    ],
    location: {
      id: String,
      address1: String,
      address2: String,
      city: String,
      district: String,
      latitude: String,
      longitude: String,
      "@type": { type: String, default: 'GeographicAddress' },
    },
    serviceStatus: String,
  },
  {
    timestamps: true,
    collection: 'ftthfulldatas',
  }
);

module.exports =
  mongoose.models.TMF638_FTTHFullData ||
  mongoose.model('TMF638_FTTHFullData', TMF638_FTTHFullDataSchema);

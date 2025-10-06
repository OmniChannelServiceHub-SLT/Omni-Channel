const mongoose = require("mongoose");

const CharacteristicSchema = new mongoose.Schema({
  id: String,
  name: String,
  valueType: String,
  value: mongoose.Schema.Types.Mixed,
  unitOfMeasure: String,
  "@type": { type: String, default: "Characteristic" }
});

const ProductSchema = new mongoose.Schema({
  id: { type: String, required: true },
  href: String,
  description: String,
  isBundle: Boolean,
  isCustomerVisible: Boolean,
  name: String,
  creationDate: Date,
  status: { type: String, enum: ["active", "inactive", "terminated"] },

  productSpecification: {
    id: String,
    href: String,
    version: String,
    "@type": { type: String, default: "ProductSpecificationRef" },
    "@referredType": { type: String, default: "ProductSpecification" }
  },

  relatedParty: [
    {
      role: String,
      partyOrPartyRole: {
        id: String,
        href: String,
        name: String,
        "@type": { type: String, default: "PartyRef" },
        "@referredType": { type: String, default: "Individual" }
      },
      "@type": { type: String, default: "RelatedPartyOrPartyRole" }
    }
  ],

  productRelationship: [
    {
      relationshipType: String,
      product: {
        id: String,
        href: String,
        name: String,
        status: String,
        productCharacteristic: [CharacteristicSchema],
        "@type": { type: String, default: "Product" }
      }
    }
  ]
});

module.exports = mongoose.model("Product", ProductSchema);

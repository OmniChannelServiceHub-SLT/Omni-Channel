/**
 * TMF622 Product Order - model for collection "productorders"
 * Used by GetDraftDataLTE to retrieve draft product order details (TMF641/622 style).
 * Schema is flexible so real DB fields are preserved; no hardcoded data.
 */
const mongoose = require("mongoose");

const RelatedPartySchema = new mongoose.Schema(
  {
    id: String,
    role: String,
    name: String,
    "@referredType": String
  },
  { _id: false }
);

const ChannelSchema = new mongoose.Schema(
  {
    id: String,
    name: String
  },
  { _id: false }
);

const ProductOfferingRefSchema = new mongoose.Schema(
  {
    id: String,
    name: String
  },
  { _id: false }
);

const ProductOrderItemSchema = new mongoose.Schema(
  {
    id: String,
    action: String,
    state: String,
    productOffering: ProductOfferingRefSchema,
    quantity: Number,
    characteristic: [{ name: String, value: mongoose.Schema.Types.Mixed }]
  },
  { _id: false }
);

const ProductOrderSchema = new mongoose.Schema(
  {
    externalId: String,
    description: String,
    category: String,
    priority: String,
    state: String,
    orderItem: [ProductOrderItemSchema],
    relatedParty: [RelatedPartySchema],
    channel: [ChannelSchema],
    externalReference: [{ name: String, value: String }],
    requestedStartDate: Date,
    requestedCompletionDate: Date,
    orderDate: Date,
    completionDate: Date,
    creationDate: Date,
    note: [{ text: String, date: Date }],
    billingAccount: { id: String, href: String },
    orderTotalPrice: [{ name: String, priceType: String, price: mongoose.Schema.Types.Mixed }]
  },
  {
    collection: "productorders",
    strict: false,
    timestamps: false
  }
);

module.exports =
  mongoose.models.ProductOrderDraftLTE ||
  mongoose.model("ProductOrderDraftLTE", ProductOrderSchema);

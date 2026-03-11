const mongoose = require("mongoose");

const RelatedPartySchema = new mongoose.Schema(
  {
    id:              { type: String, required: true },
    role:            { type: String, required: true },
    name:            { type: String },
    "@referredType": { type: String, default: "Customer" },
  },
  { _id: false }
);

const ProductOfferingSchema = new mongoose.Schema(
  {
    id:              { type: String, required: true },
    name:            { type: String, required: true },
    "@referredType": { type: String, default: "ProductOffering" },
  },
  { _id: false }
);

const ProductCharacteristicSchema = new mongoose.Schema(
  {
    name:      { type: String, required: true },
    value:     { type: String, required: true },
    valueType: { type: String, default: "String" },
  },
  { _id: false }
);

const ProductSchema = new mongoose.Schema(
  {
    id:                    { type: String },
    productCharacteristic: { type: [ProductCharacteristicSchema], default: [] },
    "@type":               { type: String, default: "Product" },
  },
  { _id: false }
);

const ProductOrderItemSchema = new mongoose.Schema(
  {
    id:              { type: String, required: true },
    action:          { type: String, enum: ["add","modify","delete","noChange"], default: "add" },
    productOffering: { type: ProductOfferingSchema, required: true },
    product:         { type: ProductSchema },
    quantity:        { type: Number, default: 1 },
    "@type":         { type: String, default: "ProductOrderItem" },
  },
  { _id: false }
);

const ChannelSchema = new mongoose.Schema(
  {
    id:              { type: String },
    name:            { type: String, default: "MySLT App" },
    "@referredType": { type: String, default: "Channel" },
  },
  { _id: false }
);

const NoteSchema = new mongoose.Schema(
  {
    id:     { type: String },
    author: { type: String },
    date:   { type: Date, default: Date.now },
    text:   { type: String },
  },
  { _id: false }
);

const DataGiftPrepaidOrderSchema = new mongoose.Schema(
  {
    id:                      { type: String, required: true, unique: true },
    href:                    { type: String },
    externalId:              { type: String },
    description:             { type: String },
    category:                { type: String, default: "DataGift" },
    priority:                { type: String, default: "4" },
    requestedStartDate:      { type: Date },
    requestedCompletionDate: { type: Date },
    state: {
      type: String,
      enum: [
        "acknowledged",
        "pending",
        "held",
        "inProgress",
        "cancelled",
        "completed",
        "failed",
        "partial",
        "assessingCancellation",
        "pendingCancellation",
      ],
      default: "acknowledged",
    },
    channel:          { type: ChannelSchema },
    relatedParty:     { type: [RelatedPartySchema],     default: [] },
    productOrderItem: { type: [ProductOrderItemSchema], default: [] },
    note:             { type: [NoteSchema],             default: [] },
    orderDate:        { type: Date, default: Date.now },
    completionDate:   { type: Date },
    "@type":          { type: String, default: "ProductOrder" },
    "@baseType":      { type: String, default: "ProductOrder" },
    "@schemaLocation":{ type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model(
  "TMF622_DataGiftPrepaidOrder",
  DataGiftPrepaidOrderSchema
);
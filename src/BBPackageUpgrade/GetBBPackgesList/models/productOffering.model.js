const mongoose = require('mongoose');

const ProductOfferingSchema = new mongoose.Schema(
  {
    bbType: {
      type: String,
      required: true,
      index: true
    },
    currentProductName: {
      type: String,
      required: true,
      index: true
    },
    category: {
      type: String,
      enum: ['upgrade', 'downgrade'],
      required: true
    },
    productOffering: {
      name: String,
      productOfferingCode: String
    }
  },
  {
    timestamps: true
  }
);

/**
 * IMPORTANT:
 * Prevent OverwriteModelError when model is imported multiple times
 */
module.exports =
  mongoose.models.ProductOfferingQualification ||
  mongoose.model('ProductOfferingQualification', ProductOfferingSchema);

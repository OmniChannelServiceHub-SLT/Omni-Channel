// Promotion service (optional extension point)
const Promotion = require('../models/Promotion');

// Example: validate bonus promotion
exports.validatePromotion = (promotionData) => {
  if (!promotionData.productOffering || !promotionData.productOffering.id) {
    throw new Error('Promotion must include a productOffering');
  }
  if (!promotionData.productCharacteristic) {
    throw new Error('Promotion must include at least one characteristic');
  }
};

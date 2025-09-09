const mongoose = require('mongoose');

const CharacteristicSchema = new mongoose.Schema({
  name: String,
  value: mongoose.Schema.Types.Mixed,
});

const PromotionSchema = new mongoose.Schema(
  {
    externalId: String,
    description: String,
    promotionDate: { type: Date, default: Date.now },
    state: { type: String, default: 'acknowledged' },
    productOffering: {
      id: String,
      name: String,
    },
    productCharacteristic: [CharacteristicSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Promotion', PromotionSchema);

const Promotion = require('../models/Promotion');

class PromotionService {
  async listPromotions(filter = {}) {
    return Promotion.find(filter).lean();
  }

  async getPromotionById(id) {
    return Promotion.findOne({ id }).lean();
  }
}

module.exports = new PromotionService();

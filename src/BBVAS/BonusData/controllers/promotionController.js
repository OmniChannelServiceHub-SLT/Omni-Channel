const promotionService = require('../services/promotionService');

class PromotionController {
  async listPromotions(req, res) {
    try {
      const filters = req.query || {};
      const promotions = await promotionService.listPromotions(filters);
      res.status(200).json(promotions);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  async getPromotionById(req, res) {
    try {
      const promotion = await promotionService.getPromotionById(req.params.id);
      if (!promotion) {
        return res.status(404).json({ error: 'Promotion not found' });
      }
      res.status(200).json(promotion);
    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }
}

module.exports = new PromotionController();

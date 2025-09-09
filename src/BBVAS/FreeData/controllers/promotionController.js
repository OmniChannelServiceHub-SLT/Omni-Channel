const Promotion = require('../models/Promotion');

// ✅ Create Promotion (POST)
exports.createPromotion = async (req, res) => {
  try {
    const promotion = new Promotion(req.body);
    await promotion.save();
    res.status(201).json(promotion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Get All Promotions (GET)
exports.getAllPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find();
    res.json(promotions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

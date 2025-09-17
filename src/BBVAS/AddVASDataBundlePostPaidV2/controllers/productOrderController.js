const ProductOrder = require('../models/ProductOderModel');

// POST /productOrder
exports.createProductOrder = async (req, res) => {
  try {
    const newOrder = new ProductOrder({
      ...req.body,
      state: "acknowledged"
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      id: savedOrder._id,
      href: `/productOrder/${savedOrder._id}`,
      externalId: savedOrder.externalId,
      description: savedOrder.description,
      category: savedOrder.category,
      priority: savedOrder.priority,
      requestedStartDate: savedOrder.requestedStartDate,
      requestedCompletionDate: savedOrder.requestedCompletionDate,
      state: savedOrder.state,
      channel: savedOrder.channel,
      relatedParty: savedOrder.relatedParty,
      productOrderItem: savedOrder.productOrderItem,
      creationDate: savedOrder.creationDate,
      completionDate: savedOrder.completionDate
    });
  } catch (err) {
    console.error('Error saving ProductOrder:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
};

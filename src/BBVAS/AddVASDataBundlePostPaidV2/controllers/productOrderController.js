const ProductOrder = require('../../VASBundleUnsubscription/models/ProductOrder');

// POST /productOrder
exports.createProductOrder = async (req, res) => {
  try {
    const newOrder = new ProductOrder({
      externalId: req.body.externalId,
      description: req.body.description,
      category: req.body.category,
      priority: req.body.priority,

      state: "acknowledged",

      orderItem: req.body.productOrderItem, // rename
      relatedParty: req.body.relatedParty,
      channel: req.body.channel ? [req.body.channel] : []
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

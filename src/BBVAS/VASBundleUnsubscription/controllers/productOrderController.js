const ProductOrder = require("../models/ProductOrder");

exports.unsubscribeVASBundle = async (req, res) => {
  try {
    const { customerId, productId, productName } = req.body;

    const order = new ProductOrder({
      customerId,
      orderItems: [
        { productId, productName, action: "delete" }
      ]
    });

    await order.save();
    res.status(201).json({
      message: "VAS Bundle unsubscription order created",
      order
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

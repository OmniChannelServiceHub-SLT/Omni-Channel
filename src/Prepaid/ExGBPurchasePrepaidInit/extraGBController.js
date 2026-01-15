const ProductOrder = require("../../BBVAS/VASBundleUnsubscription/models/ProductOrder");

/**
 * TMF622 – POST /productOrder
 * Maps to: ExGBPurchasePrepaidInit
 */
exports.createProductOrder = async (req, res) => {
  try {
    const { orderItem, relatedParty, channel } = req.body;

    if (!orderItem || !Array.isArray(orderItem) || orderItem.length === 0) {
      return res.status(400).json({
        code: "BAD_REQUEST",
        message: "orderItem is required"
      });
    }

    if (!orderItem[0].productOffering?.id) {
      return res.status(400).json({
        code: "BAD_REQUEST",
        message: "productOffering.id is required"
      });
    }

    if (!relatedParty || relatedParty.length === 0) {
      return res.status(400).json({
        code: "BAD_REQUEST",
        message: "relatedParty is required"
      });
    }

    const order = await ProductOrder.create({
      state: "acknowledged",
      orderItem,
      relatedParty,
      channel
    });

    res.status(201).json(order);

  } catch (err) {
    res.status(500).json({
      code: "INTERNAL_ERROR",
      message: err.message
    });
  }
};


/**
 * TMF622 – PATCH /productOrder/{id}
 * Maps to: ExGBPurchasePrepaidConfirm
 */
exports.updateProductOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { pgResponseCode, payId } = req.body;

    const order = await ProductOrder.findById(id);

    if (!order) {
      return res.status(404).json({
        code: "NOT_FOUND",
        message: "ProductOrder not found"
      });
    }

    const paymentSuccess = pgResponseCode === "1";

    order.state = paymentSuccess ? "completed" : "failed";
    order.orderItem[0].state = order.state;

    order.externalReference = [
      { name: "payId", value: payId },
      { name: "pgResponseCode", value: pgResponseCode }
    ];

    await order.save();

    res.status(200).json(order);

  } catch (err) {
    res.status(500).json({
      code: "INTERNAL_ERROR",
      message: err.message
    });
  }
};

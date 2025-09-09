const { getProductOfferingById } = require("../services/tmf620Service");
const { createProductOrder } = require("../services/tmf622Service");
const ProductOrderItem = require("../models/productOrderItemModel");
const ProductOrder = require("../models/ProductOderModel");

async function addVASDataBundlePostPaidV2(req, res, next) {
  try {
    const { subscriberID, packageId, commitUser, channel } = req.query;

    if (!subscriberID || !packageId || !commitUser || !channel) {
      return res.status(400).json({ error: "Missing required query params" });
    }

    // 1. Validate product offering with TMF620
    const offering = await getProductOfferingById(packageId);
    if (!offering) {
      return res.status(404).json({ error: "ProductOffering not found" });
    }

    // 2. Build ProductOrderItem
    const orderItem = new ProductOrderItem({
      id: "1",
      action: "add",
      productOffering: offering,
      quantity: 1
    });

    // 3. Build ProductOrder
    const order = new ProductOrder({
      externalId: subscriberID,
      channel,
      relatedParty: [
        { id: subscriberID, role: "Customer" },
        { id: commitUser, role: "Seller" }
      ],
      productOrderItems: [orderItem]
    });

    // 4. Call TMF622
    const createdOrder = await createProductOrder(order);

    // 5. Return response
    res.status(201).json(createdOrder);
  } catch (err) {
    next(err);
  }
}

module.exports = { addVASDataBundlePostPaidV2 };

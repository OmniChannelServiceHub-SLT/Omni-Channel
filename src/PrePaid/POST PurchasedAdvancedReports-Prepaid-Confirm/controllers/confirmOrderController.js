const ConfirmedProductOrder = require('../models/confirmOrderModel');

exports.confirmProductOrder = async (req, res) => {
  try {
    const { reporterPackage, activatedBy, transactionId } = req.body;
    const subscriberId = req.headers['subscriberid'];

    // Constructing TMF-compliant object for a COMPLETED order
    const confirmData = {
      state: "completed",
      externalId: transactionId || "TXN-" + Date.now(),
      relatedParty: [
        {
          id: subscriberId,
          role: "customer",
          name: "Subscriber"
        },
        {
          name: activatedBy,
          role: "initiator"
        }
      ],
      productOrderItem: [{
        id: "1",
        action: "add",
        productOffering: {
          id: reporterPackage,
          name: "Advanced Reports Package"
        },
        // In TMF637, once confirmed, the order item points to a realized Product
        product: {
            id: "PROD-" + Math.floor(Math.random() * 10000)
        }
      }]
    };

    const confirmedOrder = await ConfirmedProductOrder.create(confirmData);

    res.status(201).json({
      id: confirmedOrder._id,
      href: `/tmf-api/productOrdering/v4/productOrder/${confirmedOrder._id}`,
      ...confirmData
    });
  } catch (err) {
    res.status(400).json({ message: "Order Confirmation Failed", error: err.message });
  }
};
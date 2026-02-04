const Purchase = require("../model/purchaseModel");
const { v4: uuidv4 } = require('uuid');


exports.createPurchase = async (req, res) => {
  try {
    const subscriberId = req.headers['subscriber-id'] || req.headers['subscriberid'] || req.headers['x-subscriber-id'];
    
    if (!subscriberId) {
      return res.status(400).json({
        code: "400",
        reason: "Bad Request",
        message: "Subscriber ID is required in headers (subscriber-id, subscriberid, or x-subscriber-id)"
      });
    }

    const { purchaseID, payId, pgResponseCode, data } = req.body;
    if (!purchaseID) {
      return res.status(400).json({
        code: "400",
        reason: "Bad Request",
        message: "purchaseID is required"
      });
    }

    if (!payId) {
      return res.status(400).json({
        code: "400",
        reason: "Bad Request",
        message: "payId is required"
      });
    }

    if (!pgResponseCode) {
      return res.status(400).json({
        code: "400",
        reason: "Bad Request",
        message: "pgResponseCode is required"
      });
    }
    const orderId = `ORD-${uuidv4()}`;
    const orderHref = `/tmf-api/productOrderingManagement/v4/productOrder/${orderId}`;
    let orderState = "acknowledged";
    const notes = [];

    if (pgResponseCode === "SCP" || pgResponseCode === "SUCCESS") {
      orderState = "inProgress";
      notes.push({
        date: new Date(),
        author: "System",
        text: "Payment successful - Order in progress"
      });
    } else if (pgResponseCode === "FAILED" || pgResponseCode === "ERROR") {
      orderState = "failed";
      notes.push({
        date: new Date(),
        author: "System",
        text: `Payment failed with code: ${pgResponseCode}`
      });
    }
    const newPurchase = new Purchase({
      id: orderId,
      href: orderHref,
      relatedParty: {
        id: subscriberId,
        role: "Customer",
        "@referredType": "Individual"
      },
      purchaseID,
      payId,
      pgResponseCode,
      data: data || {},
      state: orderState,
      orderDate: new Date(),
      channel: {
        id: "OMNI-CHANNEL",
        name: "Omni Channel Portal",
        "@type": "Channel"
      },
      note: notes,
      "@type": "ProductOrder",
      "@baseType": "Order"
    });

    await newPurchase.save();
    return res.status(201).json({
      id: newPurchase.id,
      href: newPurchase.href,
      state: newPurchase.state,
      orderDate: newPurchase.orderDate,
      relatedParty: newPurchase.relatedParty,
      purchaseID: newPurchase.purchaseID,
      payId: newPurchase.payId,
      pgResponseCode: newPurchase.pgResponseCode,
      data: newPurchase.data,
      channel: newPurchase.channel,
      note: newPurchase.note,
      "@type": newPurchase["@type"],
      "@baseType": newPurchase["@baseType"]
    });

  } catch (err) {
    console.error("Error creating purchase order:", err.message);
    return res.status(500).json({
      code: "500",
      reason: "Internal Server Error",
      message: err.message
    });
  }
};
exports.getPurchaseById = async (req, res) => {
  try {
    const { id } = req.params;

    const purchase = await Purchase.findOne({ id });

    if (!purchase) {
      return res.status(404).json({
        code: "404",
        reason: "Not Found",
        message: `Purchase order with id ${id} not found`
      });
    }

    return res.status(200).json({
      id: purchase.id,
      href: purchase.href,
      state: purchase.state,
      orderDate: purchase.orderDate,
      completionDate: purchase.completionDate,
      relatedParty: purchase.relatedParty,
      purchaseID: purchase.purchaseID,
      payId: purchase.payId,
      pgResponseCode: purchase.pgResponseCode,
      data: purchase.data,
      channel: purchase.channel,
      note: purchase.note,
      "@type": purchase["@type"],
      "@baseType": purchase["@baseType"]
    });

  } catch (err) {
    console.error("Error retrieving purchase order:", err.message);
    return res.status(500).json({
      code: "500",
      reason: "Internal Server Error",
      message: err.message
    });
  }
};

exports.getPurchasesBySubscriber = async (req, res) => {
  try {
    const subscriberId = req.headers['subscriber-id'] || req.headers['subscriberid'] || req.headers['x-subscriber-id'];
    
    if (!subscriberId) {
      return res.status(400).json({
        code: "400",
        reason: "Bad Request",
        message: "Subscriber ID is required in headers"
      });
    }

    const purchases = await Purchase.find({ "relatedParty.id": subscriberId }).sort({ orderDate: -1 });

    return res.status(200).json({
      total: purchases.length,
      orders: purchases.map(p => ({
        id: p.id,
        href: p.href,
        state: p.state,
        orderDate: p.orderDate,
        completionDate: p.completionDate,
        purchaseID: p.purchaseID,
        payId: p.payId,
        pgResponseCode: p.pgResponseCode,
        "@type": p["@type"]
      }))
    });

  } catch (err) {
    console.error("Error retrieving purchase orders:", err.message);
    return res.status(500).json({
      code: "500",
      reason: "Internal Server Error",
      message: err.message
    });
  }
};

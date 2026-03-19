const DataGiftPrepaidOrder = require("../../../models/TMF622_ProductOrder");

/**
 * POST /BBVAS/PurchaseAdvancedReportsPrepaidConfirm
 * Original params: subscriberID, paygatetransid, activatedBy, transID
 * TMF reimplementation: params moved to request body
 * transID = the order id returned from the Init step
 */
exports.purchaseAdvancedReportsPrepaidConfirm = async (req, res) => {
  try {
    const { subscriberID, paygatetransid, activatedBy, transID } = req.body;

    // Validate required fields
    if (!subscriberID || !paygatetransid || !activatedBy || !transID) {
      return res.status(400).json({
        error:
          "Missing required fields in request body: subscriberID, paygatetransid, activatedBy, transID",
      });
    }

    // Find the Init record using transID (order id from Init step)
    const initRecord = await DataGiftPrepaidOrder.findOne({
      id: transID,
      "relatedParty.id": subscriberID,
    });

    if (!initRecord) {
      return res.status(404).json({
        error:
          "No matching Init request found for provided transID and subscriberID",
      });
    }

    if (initRecord.state === "failed" || initRecord.state === "cancelled") {
      return res.status(400).json({
        error: `Order is in '${initRecord.state}' state. Cannot confirm.`,
      });
    }

    // Update the order state to completed and store payment gateway transaction id
    initRecord.state = "completed";
    initRecord.completionDate = new Date();
    initRecord.externalId.push({
      id: String(paygatetransid),
      owner: activatedBy,
      externalIdentifierType: "paygatetransid",
      "@type": "ExternalIdentifier",
    });
    await initRecord.save();

    return res.status(200).json({
      message: "Prepaid Advanced Report Purchase Confirmed successfully",
      data: initRecord,
    });
  } catch (error) {
    console.error("Error in PurchaseAdvancedReportsPrepaidConfirm:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const PurchaseAdvancedReportsPrepaidConfirm = require("../../../models/TMF622_purchaseAdvanceReportPrepaidConfirm");
const PurchaseAdvancedReportsPrepaidInit = require("../../../models/TMF622_purchaseAdvancedReportsPrepaidInit");

/**
 * POST /BBVAS/PurchaseAdvancedReportsPrepaidConfirm
 * Confirms a prepaid advanced report purchase (Phase 2 of 2-step flow)
 * Requires a valid transactionRef from the Init step
 */
exports.purchaseAdvancedReportsPrepaidConfirm = async (req, res) => {
  try {
    const { subscriberID, reportPackageID, confirmedBy, transactionRef } =
      req.query;

    // Validate required parameters
    if (!subscriberID || !reportPackageID || !confirmedBy || !transactionRef) {
      return res.status(400).json({
        error:
          "Missing required parameters: subscriberID, reportPackageID, confirmedBy, transactionRef",
      });
    }

    // Verify the transactionRef exists from the Init step
    const initRecord = await PurchaseAdvancedReportsPrepaidInit.findOne({
      transactionRef,
      subscriberID,
    });

    if (!initRecord) {
      return res.status(404).json({
        error:
          "No matching Init request found for provided transactionRef and subscriberID",
      });
    }

    if (initRecord.status === "failed") {
      return res.status(400).json({
        error: "Init request has failed status. Cannot confirm.",
      });
    }

    // Create Confirm record
    const confirmRecord = new PurchaseAdvancedReportsPrepaidConfirm({
      subscriberID,
      reportPackageID: Number(reportPackageID),
      confirmedBy,
      transactionRef,
      status: "confirmed",
    });

    await confirmRecord.save();

    // Update Init record status to confirmed
    initRecord.status = "initiated"; // kept as initiated; confirm step owns final status
    await initRecord.save();

    return res.status(201).json({
      message: "Prepaid Advanced Report Purchase Confirmed successfully",
      data: confirmRecord.toTMF(),
    });
  } catch (error) {
    console.error("Error in PurchaseAdvancedReportsPrepaidConfirm:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * GET /BBVAS/PurchaseAdvancedReportsPrepaidConfirm
 * Get all confirm records (utility / admin)
 */
exports.getAllConfirmRecords = async (req, res) => {
  try {
    const records = await PurchaseAdvancedReportsPrepaidConfirm.find();
    return res.status(200).json(records);
  } catch (error) {
    console.error("Error fetching confirm records:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

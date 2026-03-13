const initService = require("../services/purchaseAdvancedReportsPrepaidInit.service");

/**
 * POST /BBVAS/PurchaseAdvancedReportsPrepaidInit
 * Initiates a prepaid advanced report purchase (Phase 1 of 2-step flow)
 */
exports.purchaseAdvancedReportsPrepaidInit = async (req, res) => {
  try {
    const { subscriberID, reportPackageID, requestedBy } = req.query;

    // Validate required parameters
    if (!subscriberID || !reportPackageID || !requestedBy) {
      return res.status(400).json({
        error:
          "Missing required parameters: subscriberID, reportPackageID, requestedBy",
      });
    }

    const initRecord = await initService.createInitRequest(
      subscriberID,
      Number(reportPackageID),
      requestedBy
    );

    return res.status(201).json({
      message: "Prepaid Advanced Report Init successful",
      data: initRecord.toTMF(),
    });
  } catch (error) {
    console.error("Error in PurchaseAdvancedReportsPrepaidInit:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * GET /BBVAS/PurchaseAdvancedReportsPrepaidInit
 * Get all init requests (optional utility endpoint)
 */
exports.getAllInitRequests = async (req, res) => {
  try {
    const records = await initService.getAllInitRequests();
    return res.status(200).json(records);
  } catch (error) {
    console.error("Error fetching init records:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
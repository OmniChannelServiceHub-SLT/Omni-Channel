// TMF622 - Product Ordering Management v4 - FTTH Request Status Count
const FTTHRequestStatus = require('../../../models/TMF622_ProductOrder');

exports.getFTTHRequestStatusCount = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        "@type": "Error",
        code: "ERR_MISSING_PARAMS",
        reason: "startDate and endDate are required as query parameters."
      });
    }

    // Validate date format
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        "@type": "Error",
        code: "ERR_INVALID_DATE",
        reason: "Invalid date format. Please use YYYY-MM-DD format."
      });
    }

    // Set end date to end of day
    end.setHours(23, 59, 59, 999);

    // Aggregate request status counts from centralized TMF622 model.
    // Keep fallback fields to support legacy records.
    const statusCounts = await FTTHRequestStatus.aggregate([
      {
        $addFields: {
          effectiveDate: { $ifNull: ["$creationDate", "$requestDate"] },
          effectiveState: { $ifNull: ["$state", "$status"] }
        }
      },
      {
        $match: {
          effectiveDate: {
            $gte: start,
            $lte: end
          }
        }
      },
      {
        $group: {
          _id: "$effectiveState",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          status: "$_id",
          count: 1
        }
      }
    ]);

    // Get total count
    const totalCount = statusCounts.reduce((sum, item) => sum + item.count, 0);

    res.status(200).json({
      "@type": "ProductOrderStatusReport",
      "@schemaLocation": "/tmf-api/productOrderingManagement/v4/schema/productOrderStatusReport",
      href: `/tmf-api/productOrderingManagement/v4/ftthRequest/statusCount`,
      startDate,
      endDate,
      totalCount,
      statusCounts
    });
  } catch (err) {
    res.status(500).json({
      "@type": "Error",
      code: "ERR_INTERNAL",
      reason: "Server Error",
      message: err.message
    });
  }
};

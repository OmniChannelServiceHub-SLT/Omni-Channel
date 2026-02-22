const FTTHRequestStatus = require('../models/ftthStatusModel');

exports.getFTTHRequestStatusCount = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: "startDate and endDate are required as query parameters." });
    }

    // Validate date format
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: "Invalid date format. Please use YYYY-MM-DD format." });
    }

    // Set end date to end of day
    end.setHours(23, 59, 59, 999);

    // Aggregate request status counts
    const statusCounts = await FTTHRequestStatus.aggregate([
      {
        $match: {
          requestDate: {
            $gte: start,
            $lte: end
          }
        }
      },
      {
        $group: {
          _id: "$status",
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
      startDate,
      endDate,
      totalCount,
      statusCounts
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

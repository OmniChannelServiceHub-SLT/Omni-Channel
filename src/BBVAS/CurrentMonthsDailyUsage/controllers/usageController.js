const DailyUsage = require('../models/dailyUsage'); 

exports.getUsageById = async (req, res) => {
  try {
    const { id } = req.params;
    const usage = await DailyUsage.findOne({ id: id });

    if (!usage) {
      return res.status(404).json({ error: 'Usage not found', id: id });
    }

    res.status(200).json(usage);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving usage data', error: error.message });
  }
};

exports.getUsageFiltered = async (req, res) => {
  try {
    const { id, 'usageDate.gte': startDate, 'usageDate.lte': endDate } = req.query;

    if (!id) {
        return res.status(400).json({ message: "Missing required parameter 'id'." });
    }

    // Corrected MongoDB query for the 'relatedParty' array
    const query = {
      'relatedParty.id': id
    };

    if (startDate && endDate) {
      query.usageDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
    } else if (startDate) {
      query.usageDate = { $gte: new Date(startDate) };
    } else if (endDate) {
      query.usageDate = { $lte: new Date(endDate) };
    }

    const usages = await DailyUsage.find(query);

    if (!usages || usages.length === 0) {
      return res.status(404).json({ error: 'Usage not found', id: id });
    }

    res.status(200).json(usages);

  } catch (error) {
    res.status(500).json({ message: 'Error retrieving usage data', error: error.message });
  }
};

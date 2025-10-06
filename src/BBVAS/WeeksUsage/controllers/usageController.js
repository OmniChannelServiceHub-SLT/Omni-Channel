// src/controllers/usage.controller.js
const Usage = require("../models/usageModel");
const moment = require("moment");

// GET /usage/weekly/:subscriberId
exports.getWeeklyUsage = async (req, res) => {
  try {
    const subscriberId = req.params.subscriberId;

    // Fetch all daily usage docs for this subscriber
    const dailyRecords = await Usage.find({
      type: "DailyDataUsage",
      "usageCharacteristic.name": "subscriberId",
      "usageCharacteristic.value": subscriberId,
    }).lean();

    if (!dailyRecords.length) {
      return res.status(404).json({ message: "No usage found for subscriber" });
    }

    // Group daily records into weeks
    const weeklyGroups = {};
    dailyRecords.forEach((record) => {
      const dateChar = record.usageCharacteristic.find((c) => c.name === "date").value;
      const week = moment(dateChar).isoWeek(); // ISO week number

      if (!weeklyGroups[week]) {
        weeklyGroups[week] = { total: 0, days: [] };
      }

      const usageValue = parseFloat(record.usageCharacteristic.find((c) => c.name === "totalUsage").value);
      weeklyGroups[week].total += usageValue;
      weeklyGroups[week].days.push(record);
    });

    // Build weekly Usage objects
    const weeklyUsages = Object.keys(weeklyGroups).map((week) => {
      const group = weeklyGroups[week];
      return {
        id: `weekly-${subscriberId}-week${week}`,
        href: `/usage/weekly/${subscriberId}/week${week}`,
        date: new Date(), // current response date
        type: "WeeklyDataUsage",
        status: "calculated",
        usageCharacteristic: [
          { name: "subscriberId", value: subscriberId },
          { name: "weekNumber", value: parseInt(week) },
          { name: "totalWeeklyUsage", value: group.total.toFixed(2) },
          { name: "unit", value: "GB" },
          { name: "dailyRecords", value: group.days.map((d) => d.id) }, // refs daily usage IDs
        ],
      };
    });

    res.json(weeklyUsages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

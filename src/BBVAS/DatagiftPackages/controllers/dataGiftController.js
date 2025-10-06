const DataGiftPackage = require("../models/dataGiftPackage");

exports.listDataGiftPackages = async (req, res) => {
  try {
    const { subscriberID } = req.query;
    if (!subscriberID) {
      return res.status(400).json({ error: "subscriberID is required" });
    }

    const packages = await DataGiftPackage.find({ status: "available" });

    const response = packages.map((pkg) => pkg.toTMF());

    res.json({
      subscriberID,
      packages: response,
    });
  } catch (error) {
    console.error("Error fetching Data Gift Packages:", error);
    res.status(500).json({ error: "Server error" });
  }
};

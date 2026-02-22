const DataGiftPackage = require("../models/dataGiftPackage");

// Add new data gift package
exports.addDataGiftPackage = async (req, res) => {
  try {
    const { packageName, dataAmount, unit = "MB", price = 0, status = "available" } = req.body;
    const subscriberID = "94112647459"; // Fixed subscriber ID

    if (!packageName || !dataAmount) {
      return res.status(400).json({ error: "packageName and dataAmount are required" });
    }

    const newPackage = new DataGiftPackage({
      packageName,
      dataAmount,
      unit,
      price,
      status,
      subscriberID  // Adding subscriber ID to the package
    });

    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage.toTMF());
  } catch (error) {
    console.error("Error adding Data Gift Package:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.listDataGiftPackages = async (req, res) => {
  try {
    const { subscriberID } = req.params;
    if (!subscriberID) {
      return res.status(400).json({ error: "subscriberID is required" });
    }

    const packages = await DataGiftPackage.find({ 
      status: "available",
      subscriberID: subscriberID
    });

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

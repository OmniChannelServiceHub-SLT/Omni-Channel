// controllers/bbExternal.controller.js
const ProductOffering = require('../models/productOffering.model');

exports.getBBPackagesV2 = async (req, res) => {
  try {
    const { type, package: packageName } = req.query;

    if (!type || !packageName) {
      return res.status(400).json({
        code: "400",
        reason: "InvalidQuery",
        message: "type and package query parameters are required"
      });
    }

    // Query MongoDB by category name and product name
    const offerings = await ProductOffering.find({
      "category.name": type,
      name: packageName,
      lifecycleStatus: "Active"
    });

    // If no offerings found
    if (!offerings.length) {
      return res.status(404).json({
        code: "404",
        reason: "NotFound",
        message: `No product offering found for type=${type} and package=${packageName}`
      });
    }

    res.status(200).json(offerings);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      code: "500",
      reason: "InternalError",
      message: "Unable to retrieve product offerings"
    });
  }
};

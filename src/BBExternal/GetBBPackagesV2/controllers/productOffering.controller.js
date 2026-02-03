const ProductOffering = require("../models/productOffering.model");

/**
 * GET GetBBPackagesV2
 * /BBExternal/GetBBPackagesV2?type=SLT 4G&package=Any Tide
 */
<<<<<<< HEAD
=======
// controllers/bbExternal.controller.js
const ProductOffering = require('../models/productOffering.model');

>>>>>>> dev
=======
>>>>>>> BBExternal_GetBBPackagesV2_Tharini
exports.getBBPackagesV2 = async (req, res) => {
  try {
    const { type, package: packageName } = req.query;

    if (!type) {
      return res.status(400).json({
        code: "400",
        reason: "Missing mandatory query parameter: type"
      });
    }

    const filter = {
      category: "broadband",
      lifecycleStatus: "Active",
      offeringType: type
    };

    if (packageName) {
      filter.name = packageName;
    }

    const offerings = await ProductOffering.find(filter);

    res.status(200).json({
      totalCount: offerings.length,
      productOfferings: offerings
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
<<<<<<< HEAD
=======
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
>>>>>>> dev
=======
>>>>>>> BBExternal_GetBBPackagesV2_Tharini

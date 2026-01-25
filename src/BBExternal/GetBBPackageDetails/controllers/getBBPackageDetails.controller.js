const ProductOffering = require("../../GetBBPackagesV2/models/productOffering.model");

/**
 * GET GetBBPackageDetails
 * /BBExternal/GetBBPackageDetails?code=Fiber-WFX
 */
exports.getBBPackageDetails = async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({
        code: "400",
        reason: "Missing mandatory query parameter: code"
      });
    }

    const pkg = await ProductOffering.findOne({
      _id: code,
      category: "broadband"
    });

    if (!pkg) {
      return res.status(404).json({
        code: "404",
        reason: "Broadband package not found"
      });
    }

    res.status(200).json(pkg);

  } catch (error) {
    res.status(500).json({
      code: "500",
      reason: "Internal Server Error",
      message: error.message
    });
  }
};

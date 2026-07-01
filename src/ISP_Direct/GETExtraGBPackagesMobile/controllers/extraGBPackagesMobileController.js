const {
  getExtraGBPackagesMobile,
} = require("../services/extraGBPackagesMobileService");

const extraGBPackagesMobileRequest = async (req, res) => {
  try {
    const result = await getExtraGBPackagesMobile(req.query);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    console.error("ExtraGBPackagesMobile Error:", error);

    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  extraGBPackagesMobileRequest,
};
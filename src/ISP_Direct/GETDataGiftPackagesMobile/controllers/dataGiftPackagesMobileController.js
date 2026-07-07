const {
  getDataGiftPackagesMobile,
} = require("../services/dataGiftPackagesMobileService");

const dataGiftPackagesMobileRequest = async (req, res) => {
  try {
    const result = await getDataGiftPackagesMobile(req.query);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    console.error("DataGiftPackagesMobile Error:", error);

    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  dataGiftPackagesMobileRequest,
};
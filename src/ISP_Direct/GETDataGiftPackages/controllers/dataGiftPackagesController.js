const {
  getDataGiftPackages,
} = require("../services/dataGiftPackagesService");

const dataGiftPackagesRequest = async (req, res) => {
  try {
    const result = await getDataGiftPackages(req.query);

    return res.status(result.statusCode).json(result);
  } catch (error) {
    console.error("DataGiftPackages Error:", error);

    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  dataGiftPackagesRequest,
};
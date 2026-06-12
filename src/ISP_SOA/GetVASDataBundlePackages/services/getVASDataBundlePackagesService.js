const ProductOffering = require("../../../models/TMF620_ProductOffering");

const getVASDataBundlePackages = async () => {
  try {

    const packages = await ProductOffering.find({
      $or: [
        { category: { $regex: /VAS/i } },
        { offeringType: { $regex: /VAS/i } },
        { name: { $regex: /VAS/i } }
      ],
      lifecycleStatus: "Active"
    });

    return packages;

  } catch (error) {
    throw error;
  }
};

module.exports = {
  getVASDataBundlePackages
};
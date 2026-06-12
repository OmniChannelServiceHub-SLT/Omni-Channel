const ProductOffering =
require("../../../models/TMF620_ProductOffering");

const getVASDataBundlePrice = async () => {

    const data =
    await ProductOffering.find();

    console.log(data);

    return data[0];
};

module.exports = {
    getVASDataBundlePrice
};
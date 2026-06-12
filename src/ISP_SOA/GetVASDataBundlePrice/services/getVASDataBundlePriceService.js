const ProductOffering =
require("../../../models/TMF620_ProductOffering");

const getVASDataBundlePrice = async (id) => {

    try {

        const packageData =
        await ProductOffering.findOne({ id });

        return packageData;

    }
    catch(error){

        throw error;

    }

};

module.exports = {
    getVASDataBundlePrice
};
const ProductOrder =
require("../../../models/TMF622_ProductOrder");

const addVASDataBundlePostPaid =
async (body) => {

    const order =
    await ProductOrder.create({

        customerId:
        body.customerId,

        bundleName:
        body.bundleName,

        dataVolume:
        body.dataVolume,

        validity:
        body.validity,

        price:
        body.price,

        status:
        "initiated"

    });

    return order;
};

module.exports = {
    addVASDataBundlePostPaid
};
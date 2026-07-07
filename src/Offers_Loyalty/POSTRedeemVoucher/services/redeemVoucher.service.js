const ProductOrder = require("../../../models/TMF622_ProductOrder");

const redeemVoucher = async (body = {}) => {

    const {
        subscriberID,
        voucherCode
    } = body;

    if (!subscriberID || !voucherCode) {
        return {
            success: false,
            statusCode: 400,
            message: "subscriberID and voucherCode are required"
        };
    }

    const order = await ProductOrder.create({
        id: "ORD-" + Date.now(),
        category: "RedeemVoucher",
        state: "acknowledged",
        description: "Voucher redeemed",
        relatedParty: [{
            id: subscriberID,
            role: "Customer"
        }],
        productOrderItem: [{
            id: "1",
            action: "add"
        }]
    });

    return {
        success: true,
        statusCode: 201,
        message: "Voucher redeemed successfully",
        data: order
    };

};

module.exports = {
    redeemVoucher
};
const ProductOrder = require("../../../models/TMF622_ProductOrder");

const happyDay = async (body = {}) => {

    const {

        subscriberID,
        offerID

    } = body;

    if (!subscriberID || !offerID) {

        return {

            success: false,
            statusCode: 400,
            message: "subscriberID and offerID are required"

        };

    }

    const order = await ProductOrder.create({

        id: "ORD-" + Date.now(),

        category: "HappyDay",

        state: "acknowledged",

        description: "Happy Day Enrolled",

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
        message: "Happy Day enrolled successfully",
        data: order

    };

};

module.exports = {
    happyDay
};
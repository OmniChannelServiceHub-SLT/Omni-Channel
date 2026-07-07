const {
    redeemVoucher
} = require("../services/redeemVoucher.service");

const redeemVoucherRequest = async (req, res) => {

    try {

        const result = await redeemVoucher(req.body);

        return res.status(result.statusCode).json(result);

    } catch (error) {

        console.error("RedeemVoucher Error :", error);

        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Internal Server Error"
        });

    }

};

module.exports = {
    redeemVoucherRequest
};
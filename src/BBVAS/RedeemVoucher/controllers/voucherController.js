const VoucherRedeem = require("../models/voucherRedeem");

exports.redeemVoucher = async (req, res) => {
  try {
    const { subscriberID, voucherid, channel } = req.query;

    if (!subscriberID || !voucherid || !channel) {
      return res.status(400).json({ error: "Missing required parameters" });
    }
    const bonusData = 1024;

    const redeem = new VoucherRedeem({
      subscriberID,
      voucherID: voucherid,
      channel,
      status: "redeemed",
      redeemedAt: new Date(),
      bonusData,
    });

    await redeem.save();

    res.status(201).json(redeem.toTMF());
  } catch (error) {
    console.error("Error redeeming voucher:", error);
    res.status(500).json({ error: "Server error" });
  }
};

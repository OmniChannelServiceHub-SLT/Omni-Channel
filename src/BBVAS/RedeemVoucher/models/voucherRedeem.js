const mongoose = require("mongoose");

const voucherRedeemSchema = new mongoose.Schema({
  subscriberID: { type: String, required: true },
  voucherID: { type: String, required: true },
  channel: { type: String, default: "SCP" },
  status: { type: String, default: "pending" },
  redeemedAt: { type: Date },
  bonusData: { type: Number, default: 0 },
  unit: { type: String, default: "MB" },
});

voucherRedeemSchema.methods.toTMF = function () {
  return {
    id: this._id,
    href: `http://localhost:5000/tmf-api/usageManagement/v4/Vouchers/${this._id}`,
    subscriberID: this.subscriberID,
    voucherID: this.voucherID,
    channel: this.channel,
    status: this.status,
    redeemedAt: this.redeemedAt,
    bonusData: this.bonusData,
    unit: this.unit,
  };
};

module.exports = mongoose.model("VoucherRedeem", voucherRedeemSchema);

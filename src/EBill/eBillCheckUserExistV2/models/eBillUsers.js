const mongoose = require("mongoose");

const eBillUserSchema = new mongoose.Schema({
  accountNo: { type: String, required: true },
  tpNo: { type: String, required: true },
  econtact: { type: String, required: true },
  econtactType: { type: String, enum: ["EMAIL", "MOBILE"], required: true },
  status: { type: String, default: "ACTIVE" },

  "@type": { type: String, default: "eBillUser" },
  "@baseType": { type: String, default: "CustomerContact" },
  "@schemaLocation": {
    type: String,
    default:
      "https://tmforum.org/TMF678_CustomerBill/api-schema/eBillUser.schema.json",
  },
});

module.exports = mongoose.model("eBillUser", eBillUserSchema);

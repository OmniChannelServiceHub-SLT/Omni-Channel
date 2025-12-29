const express = require("express");
const router = express.Router();
const eBillUser = require("../models/eBillUsers");

console.log("eBillUser import test:", typeof eBillUser, eBillUser.modelName);
// console.log("eBillUser import test:", typeof eBillUser, eBillUser.modelName);



// TMF 678-aligned GET endpoint that accepts JSON body
router.get("/eBillCheckUserExistV2", async (req, res) => {
  try {
    // Extract either from body or query (support both)
    const { accountNo, tpNo, econtact, econtactType } = req.body || req.query;

    if (!accountNo || !tpNo || !econtact || !econtactType) {
      return res.status(400).json({
        code: 400,
        reason: "Missing mandatory parameter",
        message:
          "accountNo, tpNo, econtact, and econtactType are required in JSON body.",
      });
    }

    // MongoDB lookup
    const user = await eBillUser.findOne({
      accountNo,
      tpNo,
      econtact,
      econtactType,
    });

    // If user found
    if (user) {
      return res.status(200).json({
        id: user._id,
        href: `/tmf-api/customerBillManagement/v5/eBillCheckUserExistV2/${user._id}`,
        status: "FOUND",
        econtactRegistered: true,
        accountNo: user.accountNo,
        tpNo: user.tpNo,
        econtact: user.econtact,
        econtactType: user.econtactType,
        "@type": user["@type"],
        "@baseType": user["@baseType"],
        "@schemaLocation": user["@schemaLocation"],
      });
    }

    // If not found
    return res.status(404).json({
      status: "NOT_FOUND",
      econtactRegistered: false,
      accountNo,
      tpNo,
      econtact,
      econtactType,
      "@type": "eBillUserCheckResponse",
      "@baseType": "TaskResult",
      "@schemaLocation":
        "https://tmforum.org/TMF678_CustomerBill/api-schema/eBillUserCheckResponse.schema.json",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: 500,
      reason: "Internal Server Error",
      message: error.message,
    });
  }
});

module.exports = router;

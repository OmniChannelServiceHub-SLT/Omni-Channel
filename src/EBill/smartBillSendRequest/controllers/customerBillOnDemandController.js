// controllers/customerBillOnDemandController.js
const { v4: uuidv4 } = require("uuid");
const CustomerBillOnDemand = require("../models/CustomerBillOnDemand");

exports.createCustomerBillOnDemand = async (req, res) => {
  try {
    const data = req.body;

    if (!data.billingAccount?.id) {
      return res.status(400).json({
        code: 400,
        reason: "billingAccount.id is required",
      });
    }

    // Create new resource
    const id = `D-${uuidv4()}`;
    const href = `${req.protocol}://${req.get("host")}/tmf-api/Customer_Bill_Management/v5/customerBillOnDemand/${id}`;

    const newBillRequest = new CustomerBillOnDemand({
      id,
      href,
      description: data.description || "Customer Bill On Demand Request",
      name: data.name || "BillOnCustomerDemand",
      billingAccount: {
        id: data.billingAccount.id,
        href: `${req.protocol}://${req.get("host")}/tmf-api/Account_Management/v5/billingAccount/${data.billingAccount.id}`,
        name: data.billingAccount.name || "Billing Account",
        "@referredType": "BillingAccount",
        "@type": "BillingAccountRef",
      },
      relatedParty: data.relatedParty || {
        role: "requester",
        "@type": "RelatedPartyRefOrRelatedPartyRoleRef",
        partyOrPartyRole: {
          id: "Unknown",
          name: "Anonymous",
          "@referredType": "Individual",
          "@type": "PartyRef",
        },
      },
      characteristic: data.characteristic || [],
      "@type": "CustomerBillOnDemand",
    });

    const savedRequest = await newBillRequest.save();

    return res.status(201).json(savedRequest);
  } catch (error) {
    console.error("Error creating CustomerBillOnDemand:", error);
    return res.status(500).json({
      code: 500,
      reason: "Internal Server Error",
    });
  }
};

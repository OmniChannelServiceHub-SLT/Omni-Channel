const { v4: uuidv4 } = require("uuid");
const { createPresentationProfile } = require("../services/SmartBillRegistrationSorceService");

/**
 * POST /tmf-api/customerBillManagement/v5/billPresentationProfile
 * Accepts either application/json or x-www-form-urlencoded
 *
 * Body fields expected from your Postman:
 * - eventSource
 * - accountNumber
 * - billingContact
 * - billHandingCode
 * - sourceTypeId (1=email,2=sms,3=portal/app)
 * - isCustomerConfirmed (true/false)
 * - isPrestigeCustomer (true/false)
 * - tpNo (optional, stored as relatedParty.id)
 */
const postSmartBillRegistration = async (req, res) => {
  const {
    eventSource,
    accountNumber,
    billingContact,
    billHandingCode,
    sourceTypeId,
    isCustomerConfirmed,
    isPrestigeCustomer,
    tpNo
  } = req.body;

  // Basic validation
  if (!accountNumber || !billingContact || !sourceTypeId) {
    return res.status(400).json({
      code: 400,
      reason: "Missing required fields",
      message: "Provide accountNumber, billingContact and sourceTypeId"
    });
  }

  // Map your incoming fields to TMF-ish model
  const id = uuidv4();
  const profile = {
    id,
    href: `/tmf-api/customerBillManagement/v5/billPresentationProfile/${id}`,
    account: {
      id: accountNumber,
      href: `/tmf-api/customerManagement/v5/customerAccount/${accountNumber}`
    },
    presentationMedia: {
      typeId: Number(sourceTypeId),
      handingCode: billHandingCode?.toString(),
      contact: billingContact
    },
    eventSource,
    isCustomerConfirmed: String(isCustomerConfirmed).toLowerCase() === "true",
    isPrestigeCustomer: String(isPrestigeCustomer).toLowerCase() === "true",
    state: "active",
    relatedParty: tpNo
      ? [{ role: "Customer", id: tpNo, href: `/tmf-api/partyManagement/v5/individual/${tpNo}` }]
      : []
  };

  const result = await createPresentationProfile(profile);

  if (result.code !== 201) {
    return res.status(result.code).json({ code: result.code, message: result.message });
  }

  const p = result.data;
  // Return a TMF-style 201 response
  return res.status(201).json({
    id: p.id,
    href: p.href,
    state: p.state,
    account: p.account,
    presentationMedia: p.presentationMedia,
    isCustomerConfirmed: p.isCustomerConfirmed,
    isPrestigeCustomer: p.isPrestigeCustomer,
    eventSource: p.eventSource,
    relatedParty: p.relatedParty,
    validFor: p.validFor ?? null
  });
};

module.exports = { postSmartBillRegistration };

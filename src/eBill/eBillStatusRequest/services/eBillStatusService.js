const BillingAccount = require("../models/billingAccountModel");
const Customer = require("../models/customerModel");

const checkEbillStatus = async (accountId, tpNo) => {
  // 1. Find BillingAccount
  const billingAccount = await BillingAccount.findOne({ id: accountId });
  if (!billingAccount) {
    return {
      isSuccess: false,
      statusCode: 404,
      errorMessage: "Billing Account not found"
    };
  }

  // 2. Find related Customer
  const relatedPartyId = billingAccount.relatedParty?.[0]?.id;
  const customer = await Customer.findOne({ id: relatedPartyId });

  if (!customer) {
    return {
      isSuccess: false,
      statusCode: 404,
      errorMessage: "Customer not found"
    };
  }

  // 3. Validate tpNo
  const customerPhone = customer.contactMedium?.find(
    (cm) => cm.type === "mobile"
  )?.characteristic?.number;

  console.log("DB phone:", customerPhone, "Request phone:", tpNo);

  if (tpNo && customerPhone !== tpNo) {
    return {
      isSuccess: false,
      statusCode: 403,
      errorMessage: "Telephone number does not match registered customer"
    };
  }

  // 4. Check billHandlingCode
  const billHandlingCode = billingAccount.characteristic?.find(
    (c) => c.name === "billHandlingCode"
  )?.value;

  return {
    isSuccess: true,
    eBillRegistered: billHandlingCode === "2" || billHandlingCode === "3",
    billingAccount,
    customer
  };
};

module.exports = { checkEbillStatus };

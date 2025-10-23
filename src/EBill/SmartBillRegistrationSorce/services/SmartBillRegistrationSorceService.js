const BillPresentationProfile = require("../models/SmartBillRegistrationSorceModel");

async function createPresentationProfile(payload) {
  try {
    const created = await BillPresentationProfile.create(payload);
    return { code: 201, data: created.toObject() };
  } catch (err) {
    return { code: 500, message: err.message };
  }
}

module.exports = { createPresentationProfile };

const DataGiftEnroll = require("../models/dataGiftEnroll.model");

async function createDataGift(data) {
  const gift = new DataGiftEnroll(data);
  return await gift.save();
}

module.exports = { createDataGift };

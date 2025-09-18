//src/services/vasDataBundle.service.js
const VASDataBundle = require("../models/addVASDataBundlePrepaidInit.model");

exports.createVASBundle = async (data) => {
  const vasBundle = new VASDataBundle({
    id: data.id,
    customerId: data.customerId,
    bundleName: data.bundleName,
    dataVolume: data.dataVolume,
    validity: data.validity,
    price: data.price,
    status: "initiated",
  });
  return await vasBundle.save();
};

exports.getVASBundles = async () => {
  return await VASDataBundle.find();
};

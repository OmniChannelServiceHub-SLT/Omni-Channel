const ProductOffering = require('../models/productOffering.model');


function normalize(value) {
  if (!value) return '';
  return value.trim();
}

async function getQualifiedOfferings(bbType, currentProductName) {
  return ProductOffering.find({
    bbType: normalize(bbType),
    currentProductName: normalize(currentProductName)
  });
}

module.exports = {
  getQualifiedOfferings
};

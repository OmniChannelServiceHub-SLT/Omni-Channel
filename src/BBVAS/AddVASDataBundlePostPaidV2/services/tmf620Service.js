const ProductOffering = require("../models/ProductOfferingModel");

// Instead of calling real TMF620 API
async function getProductOfferingById(id) {
  // simulate one product offering
  if (id === "41") {
    return new ProductOffering({
      id: "41",
      name: "5GB Extra Data Bundle",
      description: "Provides 5GB of extra data valid for 30 days",
      lifecycleStatus: "Active",
      isBundle: false
    });
  }
  return null; // simulate not found
}

module.exports = { getProductOfferingById };

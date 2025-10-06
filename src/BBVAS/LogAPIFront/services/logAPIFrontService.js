const Product = require("../models/ProductModel");

class ProductService {
  async findProducts(subscriberId, packageId) {
    const query = {};

    if (subscriberId) {
      query["relatedParty.partyOrPartyRole.id"] = subscriberId;
    }
    if (packageId) {
      query["productSpecification.id"] = packageId;
    }

    return Product.find(query).lean();
  }
}

module.exports = new ProductService();

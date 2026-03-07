const Product = require("./ProductModel");

class ProductInventoryService {

  async findActivePEOVASByTelephone(telephoneNo) {
    return Product.findOne({
      publicIdentifier: telephoneNo,
      "productOffering.name": "PEOVAS",
      status: "active"
    }).lean();
  }

}

module.exports = new ProductInventoryService();

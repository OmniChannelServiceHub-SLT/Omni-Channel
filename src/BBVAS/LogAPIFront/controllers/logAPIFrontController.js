const productService = require("../services/logAPIFrontService");

class ProductController {
  async listProducts(req, res) {
    try {
      const subscriberId = req.query["relatedParty.id"];
      const packageId = req.query["productSpecification.id"];

      const products = await productService.findProducts(subscriberId, packageId);

      if (!products || products.length === 0) {
        return res.status(404).json({ message: "No products found for subscriber" });
      }

      return res.json(products);
    } catch (error) {
      console.error("Error retrieving products:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = new ProductController();

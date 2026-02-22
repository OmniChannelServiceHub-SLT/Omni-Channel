/**
 * TMF622 Product Order Management – controller
 * Retrieve by id and list by NIC; responses follow TMF error format.
 */
const ProductOrderService = require("../services/ProductOrderService");

/**
 * List product orders filtered by user NIC (TMF622 GET /productOrder?nic=...)
 */
async function listProductOrders(req, res) {
  try {
    const { nic } = req.query;
    const orders = await ProductOrderService.listByNic(nic);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      code: "500",
      reason: "Internal Server Error",
      message: error.message,
      status: "500",
      referenceError: "https://tmforum.org/Error"
    });
  }
}

/**
 * Retrieve a single product order by id (TMF622 GET /productOrder/{id})
 */
async function retrieveProductOrder(req, res) {
  try {
    const { id } = req.params;
    const productOrder = await ProductOrderService.retrieveById(id);

    if (!productOrder) {
      return res.status(404).json({
        code: "404",
        reason: "Not Found",
        message: "ProductOrder not found",
        status: "404",
        referenceError: "https://tmforum.org/Error"
      });
    }

    res.status(200).json(productOrder);
  } catch (error) {
    res.status(500).json({
      code: "500",
      reason: "Internal Server Error",
      message: error.message,
      status: "500",
      referenceError: "https://tmforum.org/Error"
    });
  }
}

module.exports = {
  listProductOrders,
  retrieveProductOrder
};

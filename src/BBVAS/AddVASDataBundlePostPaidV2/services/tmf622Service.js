// Instead of calling real TMF622 API
async function createProductOrder(order) {
  // Simulate response that TMF622 would give
  return {
    id: "PO-" + Date.now(),
    state: "acknowledged",
    externalId: order.externalId,
    orderDate: new Date().toISOString(),
    expectedCompletionDate: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
    productOrderItem: order.productOrderItem
  };
}

module.exports = { createProductOrder };

// ProductOrderItem aligned to TMF622
class ProductOrderItem {
  constructor({ id, action, productOffering, quantity = 1 }) {
    this.id = id;
    this.action = action;
    this.quantity = quantity;
    this.productOffering = {
      id: productOffering.id,
      name: productOffering.name
    };
  }
}

module.exports = ProductOrderItem;

// ProductOrder aligned to TMF622
class ProductOrder {
  constructor({ externalId, channel, relatedParty, productOrderItems }) {
    this.externalId = externalId;
    this.channel = [{ name: channel }];
    this.relatedParty = relatedParty;
    this.productOrderItem = productOrderItems;
    this.state = "acknowledged";
  }
}

module.exports = ProductOrder;


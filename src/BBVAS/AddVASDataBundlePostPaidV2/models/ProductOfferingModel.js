// ProductOffering aligned to TMF620
class ProductOffering {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.lifecycleStatus = data.lifecycleStatus;
    this.isBundle = data.isBundle;
    this.validFor = data.validFor;
    this.category = data.category;
    this.channel = data.channel;
    this.productSpecification = data.productSpecification;
  }
}

module.exports = ProductOffering;

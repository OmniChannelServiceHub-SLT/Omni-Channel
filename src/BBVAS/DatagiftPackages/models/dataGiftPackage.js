const mongoose = require("mongoose");

const dataGiftPackageSchema = new mongoose.Schema({
  packageName: { type: String, required: true },
  dataAmount: { type: Number, required: true }, // MB/GB
  unit: { type: String, default: "MB" },
  price: { type: Number, default: 0 },
  status: { type: String, default: "available" }, // available / inactive
  createdAt: { type: Date, default: Date.now },
});

dataGiftPackageSchema.methods.toTMF = function () {
  return {
    id: this._id,
    href: `http://localhost:5000/tmf-api/usageManagement/v4/DataGiftPackages/${this._id}`,
    name: this.packageName,
    dataAmount: this.dataAmount,
    unit: this.unit,
    price: this.price,
    status: this.status,
  };
};

module.exports =
  mongoose.models.DataGiftPackage ||
  mongoose.model("DataGiftPackage", dataGiftPackageSchema);

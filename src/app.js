const express = require("express");
const app = express();

const promotionRoutes = require("./BBVAS/BonusData/routes/promotionRoutes");
const usageRoutes = require("./BBVAS/UssageSummery/routes/usageRoutes");
const dataGiftRoutes = require("./BBVAS/GiftDatapackages/routes/dataGiftRoutes");
const voucherRoutes = require("./BBVAS/RedeemVoucher/routes/voucherRoutes");
const dataTransferRoutes = require("./BBVAS/GetDataTransferAmounts/routes/dataTransferRoutes");
const advancedReportRoutes = require("./BBVAS/PurchaseAdvancedReports-Postpaid/routes/advancedReportRoutes");
// const accountRoutes = require('./routes/account.routes');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/tmf-api/promotionManagement/v4/promotion", promotionRoutes);
app.use("/tmf-api/usageManagement/v4/Usage", usageRoutes);
app.use("/tmf-api/usageManagement/v4/DataGiftPackages", dataGiftRoutes);
app.use("/tmf-api/usageManagement/v4/Vouchers", voucherRoutes);
app.use("/tmf-api/usageManagement/v4/DataTransferAmounts", dataTransferRoutes);
app.use("/tmf-api/usageManagement/v4/AdvancedReports", advancedReportRoutes);
// app.use('/api/Account', accountRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Omini API Server is running ✅");
});

module.exports = app;

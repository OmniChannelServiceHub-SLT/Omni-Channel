const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Import Routes
//const promotionRoutes = require('./BBVAS/BonusData/routes/promotionRoutes');
const enhancedCurrentDailyUsageRoutes = require('./BBVAS/EnhancedCurrentDailyUsage/routes/EnhancedCurrentDailyUsageRoutes');
const customerRoutes = require("./BBVAS/ChangeBBPassword/routes/customerRoutes");
const productOrderRoutes = require("./BBVAS/VASBundleUnsubscription/routes/productOrderRoutes");
const usageRoutes = require("./BBVAS/WeeksUsage/routes/usageRoutes");
const serviceRoutes = require("./BBVAS/UnsubscribeAdvancedReports/routes/serviceRoutes");
const summeryRoutes = require("./BBVAS/UsageSummery/routes/usageRoutes.js");
const vasRoutes = require("./BBVAS/AddVASDataBundlePrepaidInit/routes/vasDataBundle.routes.js");
const promotionRoutesFreeData = require("./BBVAS/FreeData/routes/promotionRoutes.js");
const contactRoutes = require("./BBVAS/PUTUpdateContact/routes/contact.routes");
const reportTimePeriodRoutes = require("./BBVAS/GetReportTimePeriod/routes/reportTimePeriod.routes");
const advancedReportingPackageRoutes = require("./BBVAS/GetAdvancedReportingPackage/routes/advancedReportingPackage.routes");
const updateISPContactRoutes = require("./BBVAS/PUTUpdateISPContact/routes/customer.routes.js");
const dailyUsageRoutes = require('./BBVAS/CurrentMonthsDailyUsage/routes/currentUsageRoutes');
const dataGiftRoutes = require("./BBVAS/DataGiftEnrollPrepaidInit/routes/dataGiftRoutes");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/", (req, res) => {
  res.send("🚀 Omni API Server is running ✅");
});

// Routes
app.use('/tmf-api/promotionManagement/v4/promotion', promotionRoutesFreeData);
app.use('/tmf-api/usageManagement/v4/usage', enhancedCurrentDailyUsageRoutes);
app.use("/tmf-api/customerManagement/v5", customerRoutes);
app.use("/tmf-api/productOrdering/v4/productOrder", productOrderRoutes);
app.use("/", vasRoutes);
app.use("/tmf-api/ServiceActivationAndConfiguration/v4", serviceRoutes);
app.use(
  "/tmf-api/productOrdering/v4",
  require("./BBVAS/DataGiftEnroll/routes/dataGiftEnroll.routes")
);
//app.use("/tmf-api/promotionManagement/v4/promotion", promotionRoutes);
app.use("/tmf-api/usageManagement/v4", usageRoutes);
app.use("/tmf-api/usageManagement/v4", summeryRoutes);
app.use("/tmf-api", contactRoutes);
app.use("/tmf-api/reportManagement/v5", reportTimePeriodRoutes);
app.use("/tmf-api/reportManagement/v5", advancedReportingPackageRoutes);
app.use("/", updateISPContactRoutes); 
app.use('/tmf-api/usageManagement/v4/daily', dailyUsageRoutes);
app.use("/tmf-api/dataGift/v1", dataGiftRoutes);

module.exports = app; // Export the Express app

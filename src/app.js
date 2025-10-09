const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Import Routes
// const promotionRoutes = require('./BBVAS/BonusData/routes/promotionRoutes');
const enhancedCurrentDailyUsageRoutes = require("./BBVAS/EnhancedCurrentDailyUsage/routes/EnhancedCurrentDailyUsageRoutes");
const customerRoutes = require("./BBVAS/ChangeBBPassword/routes/customerRoutes");
const productOrderRoutes = require("./BBVAS/VASBundleUnsubscription/routes/productOrderRoutes");
const usageRoutes = require("./BBVAS/WeeksUsage/routes/usageRoutes");
const serviceRoutes = require("./BBVAS/UnsubscribeAdvancedReports/routes/serviceRoutes");
const summeryRoutes = require("./BBVAS/UsageSummery/routes/usageRoutes.js");
const vasRoutes = require("./BBVAS/AddVASDataBundlePrepaidInit/routes/vasDataBundle.routes.js");
const contactRoutes = require("./BBVAS/PUTUpdateContact/routes/contact.routes");
const reportTimePeriodRoutes = require("./BBVAS/GetReportTimePeriod/routes/reportTimePeriod.routes");
const advancedReportingPackageRoutes = require("./BBVAS/GetAdvancedReportingPackage/routes/advancedReportingPackage.routes");
const salesLeadRoutes = require("./Sales/SalesLeadCreationRequest/routes/salesLeadRoutes.js");
const DataBundlePostpaidRoutes = require("./BBVAS/AddVASDataBundlePostPaidV2/routes/productOrderRoute.js");
const serviceRequestRoutes = require("./Fault/CreateServiceRequest/routes/serviceRequest.routes");
//const promotionRoutesFreeData = require("./BBVAS/FreeData/routes/promotionRoutes.js");
// const accountRoutes = require('./routes/account.routes');
// const promotionRoutes = require('./BBVAS/BonusData/routes/promotionRoutes');
const poqRoutes = require("./BBVAS/GetExtraGBPackagesMobile/routes/productOfferingQualificationRoutes");
const troubleTicketRoutes = require("./Fault/GetTroubleTicket/routes/troubleTicketRoutes.js");

// Middleware
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/", (req, res) => {
  res.send("🚀 Omni API Server is running ✅");
});

// Routes
// app.use("/tmf-api/promotionManagement/v4/promotion", promotionRoutesFreeData);
app.use("/tmf-api/usageManagement/v4/usage", enhancedCurrentDailyUsageRoutes);
app.use("/tmf-api/customerManagement/v5", customerRoutes);
app.use("/tmf-api/productOrdering/v4/productOrder", productOrderRoutes);
app.use("/", vasRoutes);
app.use("/tmf-api/ServiceActivationAndConfiguration/v4", serviceRoutes);
app.use(
  "/tmf-api/productOrdering/v4",
  require("./BBVAS/DataGiftEnroll/routes/dataGiftEnroll.routes")
);
// app.use("/tmf-api/promotionManagement/v4/promotion", promotionRoutes);
app.use("/tmf-api/usageManagement/v4", usageRoutes);
app.use("/tmf-api/usageManagement/v4", summeryRoutes);
app.use("/tmf-api", contactRoutes);
app.use("/tmf-api/reportManagement/v5", reportTimePeriodRoutes);
app.use("/tmf-api/reportManagement/v5", advancedReportingPackageRoutes);
app.use("/tmf-api/sales/v4/", salesLeadRoutes);
app.use("/tmf-api/productOrderingManagement/v4", DataBundlePostpaidRoutes);
app.use("/tmf-api/productOfferingQualification/v5", poqRoutes);
<<<<<<< Updated upstream
app.use("/tmf-api/troubleTicket/v5/troubleTicket", troubleTicketRoutes);
=======
app.use("/tmf-api/troubleTicket/v5", troubleTicketRoutes);
app.use("/tmf-api/usageManagement/v4/Vouchers", RedeemVoucherRoutes);
app.use("/tmf-api/usageManagement/v4/DataTransferAmounts", DataTransferAmountRoutes);
// app.use("/tmf-api/usageManagement/v4/Vouchers", voucherRoutes);
app.use("/tmf-api/usageManagement/v4/DataGiftPackages", GiftPackageRoutes);
app.use("/tmf-api/usageManagement/v4/AdvancedReports", AdvancedReportPostpaidRoutes);
>>>>>>> Stashed changes
app.use("/", serviceRequestRoutes);
// app.use('/api/Account', accountRoutes);

module.exports = app; // Export the Express app

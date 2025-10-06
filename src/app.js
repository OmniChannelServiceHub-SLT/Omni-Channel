const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const express = require('express');
const cors = require('cors');
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
const updateISPContactRoutes = require("./BBVAS/PUTUpdateISPContact/routes/customer.routes.js");
const dailyUsageRoutes = require('./BBVAS/CurrentMonthsDailyUsage/routes/currentUsageRoutes');
const dataGiftRoutes = require("./BBVAS/DataGiftEnrollPrepaidInit/routes/dataGiftRoutes");
const validateDataGiftRoutes = require("./BBVAS/ValidateDataGiftSub/routes/dataGiftRoutes");
const addVASRoutes = require('./BBVAS/AddVASDataBundlePrepaidConfirm/routes/vasRoutes');
const purchasedHistoryRoutes = require('./BBVAS/PurchasedHistory/routes/purchasedHistoryRoutes');
const dataGiftPackagesRoutes = require('./BBVAS/GetDataGiftPackagesMobile/routes/dataGiftRoutes');
const salesLeadRoutes = require("./Sales/SalesLeadCreationRequest/routes/salesLeadRoutes.js");
const DataBundlePostpaidRoutes = require("./BBVAS/AddVASDataBundlePostPaidV2/routes/productOrderRoute.js");
const AddVASDataBundlePostPaid = require("./BBVAS/addVASDataBundlePostPaid/routes/ServiceOrderRoute.js");
const serviceRequestRoutes = require("./Fault/CreateServiceRequest/routes/serviceRequest.routes");
const DataTransferAmountRoutes = require('./BBVAS/DataTransferAmount/routes/dataTransferRoutes.js');
const PreviousMonthUsageRoutes = require('./BBVAS/PreviousMonthDailyUsage/routes/usageRoutes.js');
const RedeemVoucherRoutes = require('./BBVAS/RedeemVoucher/routes/voucherRoutes.js');
const GiftPackageRoutes = require('./BBVAS/DatagiftPackages/routes/dataGiftRoutes.js');
const AdvancedReportPostpaidRoutes = require('./BBVAS/Advancedreport-Postpaid/routes/advancedReportRoutes.js');
//const promotionRoutesFreeData = require("./BBVAS/FreeData/routes/promotionRoutes.js");
// const accountRoutes = require('./routes/account.routes');
const productOfferingQualificationRoutes = require("./BBVAS/getBonusData/routes/ProductOfferingQualification.js");
// const promotionRoutes = require('./BBVAS/BonusData/routes/promotionRoutes');
const poqRoutes = require("./BBVAS/GetExtraGBPackagesMobile/routes/productOfferingQualificationRoutes");
const troubleTicketRoutes = require("./Fault/GetTroubleTicket/routes/troubleTicketRoutes.js");
const eBillRegisetrationRoutes = require("./eBill/eBill_Registration/routes/CustomerBill.js");
const billRoutes = require('./EBill/BillDownloadRequest/routes/billDownloadRoutes');


// Middleware
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));



// Routes
// app.use("/tmf-api/promotionManagement/v4/promotion", promotionRoutesFreeData);
app.use('/tmf-api/billManegement/v4', eBillRegisetrationRoutes);
app.use("/tmf-api/usageManagement/v4/usage", enhancedCurrentDailyUsageRoutes);
app.use("/tmf-api/customerManagement/v5", customerRoutes);
app.use("/tmf-api/productOrdering/v4/productOrder", productOrderRoutes);

app.use("/tmf-api/dataGift/v1", validateDataGiftRoutes);

app.use("/", vasRoutes);
app.use("/tmf-api/ServiceActivationAndConfiguration/v4", serviceRoutes);
app.use(
  "/tmf-api/productOrdering/v4",
  require("./BBVAS/DataGiftEnroll/routes/dataGiftEnroll.routes")
);
app.use("/tmf-api/usageManagement/v4", usageRoutes);
app.use("/tmf-api/usageManagement/v4", summeryRoutes);
app.use("/tmf-api", contactRoutes);
app.use("/tmf-api/reportManagement/v5", reportTimePeriodRoutes);
app.use("/tmf-api/reportManagement/v5", advancedReportingPackageRoutes);
app.use("/", updateISPContactRoutes); 
app.use('/tmf-api/usageManagement/v4/daily', dailyUsageRoutes);
app.use("/tmf-api/dataGift/v1", dataGiftRoutes);
app.use('/api/BBVAS', addVASRoutes);
app.use('/tmf-api/usage/v4', purchasedHistoryRoutes);
app.use('/tmf-api/serviceActivation/v4.0.0', dataGiftPackagesRoutes);
app.use('/tmf-api/sales/v4/', salesLeadRoutes);
app.use('/tmf-api/productOrderingManagement/v4', DataBundlePostpaidRoutes);
// app.use('/api/Account', accountRoutes);
app.use("/", vasRoutes);
app.use("/tmf-api/ServiceActivationAndConfiguration/v4", serviceRoutes);
app.use(
  "/tmf-api/productOrdering/v4",
  require("./BBVAS/DataGiftEnroll/routes/dataGiftEnroll.routes")
);
// app.use("/tmf-api/promotionManagement/v4/promotion", promotionRoutes);
app.use("/tmf-api/usageManagement/v4", usageRoutes);
app.use("/tmf-api/usageManagement/v4/PreviousMonth", PreviousMonthUsageRoutes); 
app.use("/tmf-api/usageManagement/v4", summeryRoutes);
app.use("/tmf-api", contactRoutes);
app.use("/tmf-api/reportManagement/v5", reportTimePeriodRoutes);
app.use("/tmf-api/reportManagement/v5", advancedReportingPackageRoutes);
app.use("/tmf-api/sales/v4/", salesLeadRoutes);
app.use("/tmf-api/productOrderingManagement/v4", DataBundlePostpaidRoutes);
app.use("/tmf-api/productOfferingQualification/v5", poqRoutes);
app.use("/tmf-api/troubleTicket/v5/troubleTicket", troubleTicketRoutes);
app.use("/tmf-api/usageManagement/v4/Vouchers", RedeemVoucherRoutes);
app.use("/tmf-api/usageManagement/v4/DataTransferAmounts", DataTransferAmountRoutes);
// app.use("/tmf-api/usageManagement/v4/Vouchers", voucherRoutes);
app.use("/tmf-api/usageManagement/v4/DataGiftPackages", GiftPackageRoutes);
app.use("/tmf-api/usageManagement/v4/AdvancedReports", AdvancedReportPostpaidRoutes);
app.use("/", serviceRequestRoutes);
app.use('/tmf-api/customerBillManagement/v5', billRoutes);
// app.use('/api/Account', accountRoutes);


// app.use("/tmf-api/serviceOrder/v1/serviceOrder", authMiddleware, AddVASDataBundlePostPaid)
// // Mock auth middleware for TMF ServiceOrder
// function authMiddleware(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   if (authHeader && authHeader === "Bearer mock-fake-token-12345") next();
//   else res.status(401).json({ message: "Unauthorized" });
// }

// app.use(
//   '/tmf-api/productOfferingQualification/v1/productOfferingQualification',
//   authMiddleware,
//   productOfferingQualificationRoutes
// );



module.exports = app; // Export the Express app
module.exports = app; // Export the Express app

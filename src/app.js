const express = require("express");
const cors = require("cors");
const app = express();

// Import Routes
// const promotionRoutes = require('./BBVAS/BonusData/routes/promotionRoutes');


//BBVAS
const enhancedCurrentDailyUsageRoutes = require("./BBVAS/EnhancedCurrentDailyUsage/routes/EnhancedCurrentDailyUsageRoutes");
const customerRoutes = require("./BBVAS/ChangeBBPassword/routes/customerRoutes");
const productOrderRoutes = require("./BBVAS/VASBundleUnsubscription/routes/productOrderRoutes");
const dataGiftRoutes = require("./BBVAS/ValidateDataGiftSub/routes/dataGiftRoutes");
const usageRoutes = require("./BBVAS/WeeksUsage/routes/usageRoutes");
const serviceRoutes = require("./BBVAS/UnsubscribeAdvancedReports/routes/serviceRoutes");
const summeryRoutes = require("./BBVAS/UsageSummery/routes/usageRoutes.js");
const vasRoutes = require("./BBVAS/AddVASDataBundlePrepaidInit/routes/vasDataBundle.routes.js");
const contactRoutes = require("./BBVAS/PUTUpdateContact/routes/contact.routes");
const reportTimePeriodRoutes = require("./BBVAS/GetReportTimePeriod/routes/reportTimePeriod.routes");
const advancedReportingPackageRoutes = require("./BBVAS/GetAdvancedReportingPackage/routes/advancedReportingPackage.routes");
const updateISPContactRoutes = require("./BBVAS/PUTUpdateISPContact/routes/customer.routes.js");
const dailyUsageRoutes = require('./BBVAS/CurrentMonthsDailyUsage/routes/currentUsageRoutes');
const dataGiftEntrollRoutes = require("./BBVAS/DataGiftEnrollPrepaidInit/routes/dataGiftRoutes");
const vasConfirmRoutes = require("./BBVAS/AddVASDataBundlePrepaidConfirm/routes/vasRoutes.js");
const validateDataGiftRoutes = require("./BBVAS/ValidateDataGiftSub/routes/dataGiftRoutes");
const addVASRoutes = require('./BBVAS/AddVASDataBundlePrepaidConfirm/routes/vasRoutes');
const purchasedHistoryRoutes = require('./BBVAS/PurchasedHistory/routes/purchasedHistoryRoutes');
const dataGiftPackagesRoutes = require('./BBVAS/GetDataGiftPackagesMobile/routes/dataGiftRoutes');
const DataBundlePostpaidRoutes = require("./BBVAS/AddVASDataBundlePostPaidV2/routes/productOrderRoute.js");
const AddVASDataBundlePostPaid = require("./BBVAS/addVASDataBundlePostPaid/routes/ServiceOrderRoute.js");
const DataTransferAmountRoutes = require('./BBVAS/DataTransferAmount/routes/dataTransferRoutes.js');
const PreviousMonthUsageRoutes = require('./BBVAS/PreviousMonthDailyUsage/routes/usageRoutes.js');
const RedeemVoucherRoutes = require('./BBVAS/RedeemVoucher/routes/voucherRoutes.js');
const GiftPackageRoutes = require('./BBVAS/DatagiftPackages/routes/dataGiftRoutes.js');
const AdvancedReportPostpaidRoutes = require('./BBVAS/Advancedreport-Postpaid/routes/advancedReportRoutes.js');
const productOfferingQualificationRoutes = require("./BBVAS/getBonusData/routes/ProductOfferingQualification.js");
const poqRoutes = require("./BBVAS/GetExtraGBPackagesMobile/routes/productOfferingQualificationRoutes");
//const promotionRoutesFreeData = require("./BBVAS/FreeData/routes/promotionRoutes.js");
// const accountRoutes = require('./routes/account.routes');

//Sales
const salesLeadRoutes = require("./Sales/SalesLeadCreationRequest/routes/salesLeadRoutes.js");

//Faults
const serviceRequestRoutes = require("./Fault/CreateServiceRequest/routes/serviceRequest.routes");
const troubleTicketRoutes = require("./Fault/GetTroubleTicket/routes/troubleTicketRoutes.js");
const faultRequestRoutes = require('./Fault/CreateFaultRequestV2/routes/faultRequestRoutes');

//Ebill
const eBillRegisetrationRoutes = require("./eBill/eBill_Registration/routes/CustomerBill.js");
const billRoutes = require('./EBill/BillDownloadRequest/routes/billDownloadRoutes');
const eBillCheckUserExistRoutes = require("./EBill/eBillCheckUserExistV2/routes/eBillRoutes.js");

//PEOVAS
const productInventoryRoutes = require("./PEOVAS/CustomerValidation_malsha/productInventoryRoute");
const purchasedProductRoutes = require("./PEOVAS/PostPurchasedProduct/route/purchasedProductroutes.js");
const getPurchasedProductsRoutes = require("./PEOVAS/GetPurchasedProducts/routes/getPurchasedProductsroutes.js");
const serviceInventoryRoutes = require("./PEOVAS/CheckOmniTP/serviceInventoryRoutes.js");

//Notifications
const getPopupMessageBanner = require("./Notifications/GetPopupMessageBanner/routes/popupMessage.routes.js");
const postPushNotifications = require("./Notifications/PostPushNotifications/routes/pushNotification.routes.js");


//Prepaid 
const dataGiftEnrollInit = require('./Prepaid/DataGiftEnrollInit/routes/dataGiftEnrollInit.routes.js')
const dataGiftEnrolInitConfirm = require('./Prepaid/DataGiftEnrollPrepaid-confirm/routes/purchaseRoutes.js')
const vasBundleConfirmRoutes = require(
  "./Prepaid/POSTAdd VAS Data Bundle - Prepaid Confirm/routes/vasBundleConfirm.routes"
);

const unsubscribeAdvancedReportsRoutes = require(
  "./Prepaid/POSTUnsubscribeAdvancedReports/routes/unsubscribeAdvancedReports.routes"
);

const ExtraGBPurchasePrepaidRoutes = require("./Prepaid/ExGBPurchasePrepaidInit/extraGBRoutes.js");

//PrePaid
const prepaidOrderRoutes = require("./PrePaid/POST PurchasedAdvancedReports-Prepaid-Init/routes/productOrderRoutes.js");
const confirmRoutes = require('./PrePaid/POST PurchasedAdvancedReports-Prepaid-Confirm/routes/confirmOrderRoutes');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Routes

//BBVAS
// app.use("/tmf-api/promotionManagement/v4/promotion", promotionRoutesFreeData);
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
app.use("/tmf-api", contactRoutes);
app.use("/tmf-api/reportManagement/v5", reportTimePeriodRoutes);
app.use("/tmf-api/reportManagement/v5", advancedReportingPackageRoutes);
app.use("/", updateISPContactRoutes);
app.use('/tmf-api/usageManagement/v4/daily', dailyUsageRoutes);
app.use("/tmf-api/dataGift/v1", dataGiftRoutes);
app.use("/tmf-api/productOrdering/v4", vasConfirmRoutes);
app.use('/tmf-api/usage/v4', purchasedHistoryRoutes);
app.use('/tmf-api/serviceActivation/v4.0.0', dataGiftPackagesRoutes);
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
app.use("/tmf-api/usageManagement/v5", summeryRoutes);
app.use("/tmf-api", contactRoutes);
app.use("/tmf-api/reportManagement/v5", reportTimePeriodRoutes);
app.use("/tmf-api/reportManagement/v5", advancedReportingPackageRoutes);
app.use("/tmf-api/sales/v4/", salesLeadRoutes);
app.use("/tmf-api/productOrderingManagement/v4", DataBundlePostpaidRoutes);
app.use("/tmf-api/productOfferingQualification/v5", poqRoutes);
app.use("/tmf-api/usageManagement/v4/Vouchers", RedeemVoucherRoutes);
app.use("/tmf-api/usageManagement/v4/DataTransferAmounts", DataTransferAmountRoutes);
// app.use("/tmf-api/usageManagement/v4/Vouchers", voucherRoutes);
app.use("/tmf-api/usageManagement/v4/DataGiftPackages", GiftPackageRoutes);
app.use("/tmf-api/usageManagement/v4/AdvancedReports", AdvancedReportPostpaidRoutes);
// app.use('/api/Account', accountRoutes);

//Sales
app.use('/tmf-api/sales/v4/', salesLeadRoutes);

//Faults
app.use("/", serviceRequestRoutes);
app.use("/tmf-api/troubleTicket/v5", troubleTicketRoutes);
app.use('/api/v2', faultRequestRoutes);

//Ebill
app.use("/tmf-api/customerBillManagement/v5", eBillCheckUserExistRoutes);
app.use('/tmf-api/customerBillManagement/v5', billRoutes);
app.use('/tmf-api/billManegement/v4', eBillRegisetrationRoutes);

//PEOVAS
app.use("/tmf-api/productInventory/v4", productInventoryRoutes);
app.use("/tmf-api/purchasedProduct/v1", purchasedProductRoutes);
app.use("/tmf-api", getPurchasedProductsRoutes);
app.use("/tmf-api/serviceInventory/v4/", serviceInventoryRoutes);

//Notifications
app.use("/api/notifications", getPopupMessageBanner);
app.use("/api/notifications", postPushNotifications); //uses TMF681

//Prepaid 
app.use("/tmf-api", dataGiftEnrolInitConfirm),
app.use('/tmf-api',dataGiftEnrollInit)
app.use("/tmf-api", vasBundleConfirmRoutes);
app.use("/tmf-api", unsubscribeAdvancedReportsRoutes);
app.use("/tmf-api/productOrder/v5", ExtraGBPurchasePrepaidRoutes);


//PrePaid
app.use('/tmf-api/productOrdering/v4/productOrder', prepaidOrderRoutes);
app.use('/tmf-api/productOrdering/v4/productOrder/confirm', confirmRoutes);


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

// Health check
app.get('/', (req, res) => {
  res.send('Omini API Server is running ✅');
});


module.exports = app; // Export the Express app
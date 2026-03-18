const express = require("express");
const cors = require("cors");
const app = express(); 

// Import Routes
// const promotionRoutes = require('./BBVAS/BonusData/routes/promotionRoutes');
//Account
const register = require("./Account/RegisterV2/routes/registerroutes");
const OTPVerificationRoutes = require("./Account/OTP Verification/routes/authRoutes.js");
const resendOTPRoutes = require("./Account/Resend OTP/routes/resendOTPRoutes.js");
const refreshTokenRoutes = require("./Account/RefreshToken/routes/refreshTokenRoute.js");
const loginRoutes = require("./Account/Login/routes/loginRoute.js");
const changePasswordRoutes = require("./Account/ChangePassword/routes/changePasswordRoutes.js");


//BBVAS
const enhancedCurrentDailyUsageRoutes = require("./BBVAS/EnhancedCurrentDailyUsage/routes/EnhancedCurrentDailyUsageRoutes");
const dataGiftEnrollPrepaidInitRoutes = require("./BBVAS/DataGiftEnrollPrepaidInit/routes/dataGiftEnrollPrepaidInit.routes");
const dataGiftEnrollPrepaidConfirmRoutes = require("./BBVAS/DataGiftEnrollPrepaidConfirm/routes/dataGiftEnrollPrepaidConfirm.routes");
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
const dailyUsageRoutes = require("./BBVAS/CurrentMonthsDailyUsage/routes/currentUsageRoutes");

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
const dashboardRoutes = require("./BBVAS/Dashboard/GetExtraGBDashboard/routes/dashboardRoutes.js");
const DataTransferAmountRoute = require("./BBVAS/DataTransferAmount/routes/dataTransferRoutes.js");
const TransferDataRoutes = require("./BBVAS/PostTransferData/routes/transferDataRoutes.js");
//const promotionRoutesFreeData = require("./BBVAS/FreeData/routes/promotionRoutes.js");
// const accountRoutes = require('./routes/account.routes');

//Sales
const salesLeadRoutes = require("./Sales/SalesLeadCreationRequest/routes/salesLeadRoutes.js");

//Banner
const bannerRoutes = require("./Banner/BannerDetailRequest/routes/bannerRoutes.js");

//Faults
const serviceRequestRoutes = require("./Fault/CreateServiceRequest/routes/serviceRequest.routes");
const troubleTicketRoutes = require("./Fault/GetTroubleTicket/routes/troubleTicketRoutes.js");
const faultRequestRoutes = require('./Fault/CreateFaultRequestV2/routes/faultRequestRoutes');

//Ebill
const eBillRegisetrationRoutes = require("./eBill/eBill_Registration/routes/CustomerBill.js");
const billRoutes = require('./EBill/BillDownloadRequest/routes/billDownloadRoutes');
const customerBillOnDemandRoutes = require("./EBill/smartBillSendRequest/routes/CustomerBillOnDemandRoutes.js");
const eBillCheckUserExistRoutes = require("./EBill/eBillCheckUserExistV2/routes/eBillRoutes.js");

//PEOVAS
const productInventoryRoutes = require("./PEOVAS/CustomerValidation_malsha/productInventoryRoute");
const purchasedProductRoutes = require("./PEOVAS/PostPurchasedProduct/route/purchasedProductroutes.js");
const getPurchasedProductsRoutes = require("./PEOVAS/GetPurchasedProducts/routes/getPurchasedProductsroutes.js");
const serviceInventoryRoutes = require("./PEOVAS/CheckOmniTP/serviceInventoryRoutes.js");

//Notifications
const getPopupMessageBanner = require("./Notifications/GetPopupMessageBanner/routes/popupMessage.routes.js");
const postPushNotifications = require("./Notifications/PostPushNotifications/routes/pushNotification.routes.js");

//BB Package upgrade
const getBBpackageList = require('./BBPackageUpgrade/GetBBPackgesList/routes/productOfferingQualification.routes');

//BBExternal
// const bbExternalGetPackagesV2 = require('./BBExternal/GetBBPackagesV2/routes/productOffering.routes');
// const getBBPackageDetails = require('./BBExternal/GetBBPackageDetails/routes/getBBPackageDetails.routes');
const getBBPackageComparison = require('./BBExternal/GetBBPackageComparison/routes/getBBPackageComparison.routes');
const getCurrentBBPackageV2 = require('./BBExternal/GetCurrentBBPackageV2/routes/getCurrentBBPackageV2.routes');

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
const prepaidOrderRoutes = require("./PrePaid/POST PurchasedAdvancedReports-Prepaid-Init/routes/productOrderRoutes.js");

//Dashboard
const ftthRoutes = require('./Dashboard/GetFTTHFullData/routes/ftthRoutes');
const ftthSpecificRoutes = require('./Dashboard/GetFTTHSpecificData/routes/ftthSpecificRoutes');
const ftthLoginRoutes = require('./Dashboard/FTTHDashboardLogin/routes/ftthLoginRoutes');
const ftthStatusRoutes = require('./Dashboard/GetFTTHRequestStatusCount/routes/ftthStatusRoutes');
const ftthPermissionRoutes = require('./Dashboard/SetFTTHPermission/routes/ftthPermissionRoutes');
const ftthChartRoutes = require('./Dashboard/GetFTTHRequestCharts/routes/ftthChartRoutes');
const confirmRoutes = require('./PrePaid/POST PurchasedAdvancedReports-Prepaid-Confirm/routes/confirmOrderRoutes');

//HealthCheck
const HealthCheck = require("./HealthCheck/HealthCheckRequest/routes/healthCheckRoutes");
const NotificationDetail = require("./HealthCheck/NotificationDeatail/routes/notificationDetailRoutes")

//Ebill
const ebillStatusRequest = require("./eBill/eBillStatusRequest/routes/eBillStatusRoute.js");


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Routes


//Account
app.use("/tmf-api", register);
app.use("/tmf-api", OTPVerificationRoutes);
app.use("/tmf-api", resendOTPRoutes);
app.use("/tmf-api", refreshTokenRoutes);
app.use("/tmf-api", loginRoutes);
app.use("/tmf-api", changePasswordRoutes);


//BBVAS
// app.use("/tmf-api/promotionManagement/v4/promotion", promotionRoutesFreeData);
app.use("/tmf-api/usageManagement/v4/usage", enhancedCurrentDailyUsageRoutes);
app.use("/tmf-api/customerManagement/v5", customerRoutes);
app.use('/tmf-api/productOrdering/v4', dataGiftEnrollPrepaidInitRoutes);   
app.use('/tmf-api/productOrdering/v4', dataGiftEnrollPrepaidConfirmRoutes);
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
app.use("/", serviceRequestRoutes);
app.use('/api/v2', faultRequestRoutes);
app.use('/tmf-api/customerBillManagement/v5', billRoutes);
app.use("/tmf-api/Customer_Bill_Management/v5", customerBillOnDemandRoutes);
app.use("/api/Dashboard", dashboardRoutes);
app.use("/tmf-api/usageManagement/v4/DataTransferAmounts", DataTransferAmountRoute);
app.use("/tmf-api/usageManagement/v4/TransferData", TransferDataRoutes);
// app.use('/api/Account', accountRoutes);

//Sales
app.use('/tmf-api/sales/v4/', salesLeadRoutes);

//Banner - TMF681 Communication Management
app.use('/tmf-api/communicationManagement/v4', bannerRoutes); //uses TMF681

//Faults
app.use("/", serviceRequestRoutes);
app.use("/tmf-api/troubleTicket/v5", troubleTicketRoutes);
app.use('/api/v2', faultRequestRoutes);

//Ebill
app.use("/tmf-api/customerBillManagement/v5", eBillCheckUserExistRoutes);
app.use('/tmf-api/customerBillManagement/v5', billRoutes);
app.use('/tmf-api/billManegement/v4', eBillRegisetrationRoutes);
app.use("/tmf-api/customerBillManagement/v5", ebillStatusRequest);

// New Connection (Catalog)
const productOfferingPriceRoutes = require("./NewCon/GetIniationNewConCharges/routes/productOfferingPriceRoutes.js");
const productOfferingRoutes = require("./NewCon/GetBBPackageInterim/routes/productOfferingRoutes.js");

//PEOVAS
app.use("/tmf-api/productInventory/v4", productInventoryRoutes);
app.use("/tmf-api/purchasedProduct/v1", purchasedProductRoutes);
app.use("/tmf-api", getPurchasedProductsRoutes);
app.use("/tmf-api/serviceInventory/v4/", serviceInventoryRoutes);

// New Connection (Catalog)
app.use("/tmf-api/productCatalogManagement/v4", productOfferingPriceRoutes);
app.use("/tmf-api/productCatalogManagement/v4", productOfferingRoutes);

//Notifications
app.use("/api/notifications", getPopupMessageBanner);
app.use("/api/notifications", postPushNotifications); //uses TMF681

//BB package Upgrade
app.use('/tmf-api/productOfferingQualification/v4', getBBpackageList); //uses TMF620


//BBExternal
// app.use('/tmf-api/BBExternal/GetBBPackagesV2',bbExternalGetPackagesV2);
// app.use('/tmf-api/BBExternal/GetBBPackageDetails',getBBPackageDetails);
app.use('/tmf-api/BBExternal/GetBBPackageComparison', getBBPackageComparison);

//Prepaid 

app.use("/tmf-api", dataGiftEnrolInitConfirm),
app.use('/tmf-api', dataGiftEnrollInit)
app.use("/tmf-api", vasBundleConfirmRoutes);
app.use("/tmf-api", unsubscribeAdvancedReportsRoutes);
app.use("/tmf-api/productOrder/v5", ExtraGBPurchasePrepaidRoutes);

// BBExternal - TMF637 Product Inventory / TMF622 Product Ordering
app.use("/tmf-api/productInventory/v4", require("./BBExternal/GetBBFreedomStatus/routes/getBBFreedomStatusRoutes")); //uses TMF637
app.use("/tmf-api/productOrderingManagement/v4", require("./BBExternal/RegisterForBBFreedom_Nethmi/routes/registerForBBFreedomRoutes")); //uses TMF622

//Dashboard - TMF622 Product Ordering / TMF672 User Roles & Permissions
app.use('/api/dashboard/ftth-full-data', ftthRoutes);
app.use('/tmf-api/dashboard/ftth-specific', ftthSpecificRoutes);
app.use('/tmf-api/userRolesPermissions/v4', ftthLoginRoutes); //uses TMF672
app.use('/api/Dashboard/GetFTTHRequestStatusCount', ftthStatusRoutes);
app.use('/api/Dashboard/SetFTTHPermission', ftthPermissionRoutes);
app.use('/api/Dashboard/GetFTTHRequestCharts', ftthChartRoutes);
app.use('/tmf-api/productOrdering/v4/productOrder/confirm', confirmRoutes);

// HealthCheck - TMF653 Service Test Management / TMF681 Communication Management
app.use("/tmf-api/serviceTestManagement/v4", HealthCheck); //uses TMF653
app.use("/tmf-api/communicationManagement/v4", NotificationDetail); //uses TMF681



// Health check
app.get('/', (req, res) => {
  res.send('Omini API Server is running ✅');
});


module.exports = app; // Export the Express app

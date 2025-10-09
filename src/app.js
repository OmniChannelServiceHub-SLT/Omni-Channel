const express = require("express");
const cors = require("cors");
const app = express();


const eBillRegisetrationRoutes = require("./eBill/eBill_Registration/routes/CustomerBill.js");
const billRoutes = require('./EBill/BillDownloadRequest/routes/billDownloadRoutes');
const otpAuthRoutes = require('./EBill/OTPeBillAuthRequest/routes/otpAuth.routes');


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Routes
// app.use("/tmf-api/promotionManagement/v4/promotion", promotionRoutesFreeData);
app.use('/tmf-api/billManegement/v4', eBillRegisetrationRoutes);
app.use('/tmf-api/customerBillManagement/v5', billRoutes);
app.use('/tmf-api/customerBillManagement/v5', otpAuthRoutes);
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

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();


const billRoutes = require('./EBill/BillDownloadRequest/routes/billDownloadRoutes');


// Middleware
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));




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


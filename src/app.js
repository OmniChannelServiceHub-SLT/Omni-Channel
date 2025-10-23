const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // <-- needed for form-urlencoded

// Already existing routes (examples)
// const billStatusRoutes = require("./EBill/BillStatusRequest/routes/BillStatusRoutes");
// app.use("/tmf-api/customerBillManagement/v5", billStatusRoutes);

// NEW: SmartBill registration route
const smartBillRoute = require("./EBill/SmartBillRegistrationSorce/routes/SmartBillRegistrationSorceRoute");
app.use("/tmf-api/customerBillManagement/v5", smartBillRoute);

// health
app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));

module.exports = app;

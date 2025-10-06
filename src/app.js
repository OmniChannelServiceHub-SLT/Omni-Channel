const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Import Routes
// const promotionRoutes = require('./BBVAS/BonusData/routes/promotionRoutes');
const billRoutes = require('./EBill/BillDownloadRequest/routes/billDownloadRoutes');




// Middleware
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));



// Routes
app.use('/tmf-api/customerBillManagement/v5', billRoutes);

module.exports = app; // Export the Express app

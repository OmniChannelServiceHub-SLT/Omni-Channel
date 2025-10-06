const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Replaces body-parser.json()

// Routes
const billRoutes = require('./EBill/BillDownloadRequest/routes/billDownloadRoutes');
app.use('/tmf-api/customerBillManagement/v5', billRoutes);

module.exports = app; // Export the Express app
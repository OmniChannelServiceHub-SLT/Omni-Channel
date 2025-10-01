const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Replaces body-parser.json()

// Routes
const otpAuthRoutes = require('./EBill/OTPeBillAuthRequest/routes/otpAuth.routes');
app.use('/tmf-api/customerBillManagement/v5', otpAuthRoutes);


module.exports = app; // Export the Express app

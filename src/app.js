const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

const serviceRoutes = require("./BBVAS/UnsubscribeAdvancedReports/routes/serviceRoutes")
const vasRoutes = require('./BBVAS/AddVASDataBundlePrepaidInit/routes/vasDataBundle.routes.js');
// const accountRoutes = require('./routes/account.routes');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/", vasRoutes);
app.use('/tmf-api/ServiceActivationAndConfiguration/v4', serviceRoutes);
app.use('/tmf-api/productOrdering/v4', require('./BBVAS/DataGiftEnroll/routes/dataGiftEnroll.routes'));
// app.use('/api/Account', accountRoutes);

module.exports = app; // Export the Express app
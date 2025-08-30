const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

const serviceRoutes = require("./BBVAS/UnsubscribeAdvancedReports/routes/serviceRoutes")
const vasRoutes = require('./BBVAS/AddVASDataBundlePrepaidInit/routes/vasDataBundle.routes.js');
const promotionRoutes = require('./BBVAS/FreeData/routes/promotionRoutes.js');
// const accountRoutes = require('./routes/account.routes');

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.send('🚀 Omni API Server is running ✅');
});

// Routes
app.use("/", vasRoutes);
app.use('/tmf-api/ServiceActivationAndConfiguration/v4', serviceRoutes);
app.use('/tmf-api/productOrdering/v4', require('./BBVAS/DataGiftEnroll/routes/dataGiftEnroll.routes'));
app.use('/tmf-api/promotionManagement/v4/promotion', promotionRoutes);
// app.use('/api/Account', accountRoutes);

module.exports = app; // Export the Express app


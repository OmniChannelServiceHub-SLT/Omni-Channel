const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

// Connect DB
connectDB();

const app = express();

const promotionRoutes = require('./BBVAS/BonusData/routes/promotionRoutes');
const serviceRoutes = require("./BBVAS/UnsubscribeAdvancedReports/routes/serviceRoutes")
const vasRoutes = require('./BBVAS/AddVASDataBundlePrepaidInit/routes/vasDataBundle.routes.js');
// const accountRoutes = require('./routes/account.routes');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/", vasRoutes);
app.use('/tmf-api/promotionManagement/v4/promotion', promotionRoutes);
app.use('/tmf-api/ServiceActivationAndConfiguration/v4', serviceRoutes);
// app.use('/api/Account', accountRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('Omini API Server is running ✅');
});

module.exports = app;

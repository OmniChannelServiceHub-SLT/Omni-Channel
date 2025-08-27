const express = require('express');
const app = express();

// Import Routes
const promotionRoutes = require('./BBVAS/BonusData/routes/promotionRoutes');
const enhancedCurrentDailyUsageRoutes = require('./BBVAS/EnhancedCurrentDailyUsage/routes/EnhancedCurrentDailyUsageRoutes');
const customerRoutes = require("./BBVAS/ChangeBBPassword/routes/customerRoutes");
const productOrderRoutes = require("./BBVAS/VASBundleUnsubscription/routes/productOrderRoutes");

// const accountRoutes = require('./routes/account.routes');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/tmf-api/promotionManagement/v4/promotion', promotionRoutes);
app.use('/tmf-api/usageManagement/v4/usage', enhancedCurrentDailyUsageRoutes);
app.use("/tmf-api/customerManagement/v5/customer", customerRoutes);
app.use("/tmf-api/productOrdering/v4/productOrder", productOrderRoutes);
// app.use('/api/Account', accountRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('Omini API Server is running ✅');
});

module.exports = app;

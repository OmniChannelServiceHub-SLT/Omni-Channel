const express = require('express');
const app = express();
const promotionRoutes = require('./BBVAS/BonusData/routes/promotionRoutes');
const usageRoutes = require('./BBVAS/usage summaryV2/routes/usageRoutes');
const enhancedPreviousDailyUsageRoutes = require('./BBVAS/GET EnhancedPreviousDailyUsage/routes/enhancedPreviousDailyUsageRoutes');
const dataTransferValidationRoutes = require('./BBVAS/GET ValidateDataTransferSub/routes/dataTransferValidationRoutes');
// const accountRoutes = require('./routes/account.routes');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/tmf-api/promotionManagement/v4/promotion', promotionRoutes);
app.use('/tmf-api/usageManagement/v4/usage', usageRoutes);
app.use('/tmf-api/usageManagement/v4/enhancedPreviousDailyUsage', enhancedPreviousDailyUsageRoutes);
app.use('/ValidateDataTransferSub', dataTransferValidationRoutes);
// app.use('/api/Account', accountRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('Omini API Server is running ✅');
});

module.exports = app;

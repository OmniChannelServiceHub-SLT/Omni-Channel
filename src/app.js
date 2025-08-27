const express = require('express');
const app = express();
const promotionRoutes = require('./BBVAS/BonusData/routes/promotionRoutes');
const poqRoutes = require('./BBVAS/GetExtraGBPackagesMobile/routes/productOfferingQualificationRoutes');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/tmf-api/promotionManagement/v4/promotion', promotionRoutes);
// app.use('/api/Account', accountRoutes);
app.use('/tmf-api/productOfferingQualification/v5', poqRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('Omini API Server is running ✅');
});

module.exports = app;

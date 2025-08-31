const express = require('express');
const app = express();

app.use(express.json());

// Import routes
const advancedReportingPackageRoutes = require('./BBVAS/GetAdvancedReportingPackage/routes/advancedReportingPackage.routes');

// TMF-aligned base path
app.use('/tmf-api/reportManagement/v5', advancedReportingPackageRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.send('✅ Omni-Channel Report Management API is running');
});

module.exports = app;

const express = require("express");
const app = express();

const promotionRoutes = require("./src/BBVAS/BonusData/routes/promotionRoutes");
const usageRoutes = require("./src/BBVAS/UssageSummery/routes/usageRoutes");
// const accountRoutes = require('./routes/account.routes');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/tmf-api/promotionManagement/v4/promotion", promotionRoutes);
app.use("/tmf-api/usageManagement/v4/Usage", usageRoutes);
// app.use('/api/Account', accountRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Omini API Server is running ✅");
});

module.exports = app;

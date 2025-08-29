const express = require("express");
const app = express();
const promotionRoutes = require("./BBVAS/BonusData/routes/promotionRoutes");
const dataTransferRoutes = require("./BBVAS/DataTransferAmount/routes/dataTransferRoutes");
// const accountRoutes = require('./routes/account.routes');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/tmf-api/promotionManagement/v4/promotion", promotionRoutes);
app.use("/tmf-api/usageManagement/v4/DataTransferAmounts", dataTransferRoutes);
// app.use('/api/Account', accountRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Omini API Server is running ✅");
});

module.exports = app;

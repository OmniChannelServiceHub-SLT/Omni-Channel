const express = require("express");
const app = express();
const usageRoutes = require("./BBVAS/PreviousMonthDailyUsage/routes/usageRoutes");
const promotionRoutes = require("./BBVAS/BonusData/routes/promotionRoutes");
// const accountRoutes = require('./routes/account.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/tmf-api/promotionManagement/v4/promotion", promotionRoutes);
app.use("/tmf-api/usageManagement/v4", usageRoutes);
// app.use('/api/Account', accountRoutes);

app.get("/", (req, res) => {
  res.send("Omini API Server is running ✅");
});

module.exports = app;

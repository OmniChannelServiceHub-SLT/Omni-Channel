const express = require("express");
const app = express();
const usageRoutes = require("./src/BBVAS/UsageSummery/routes/usageRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/tmf-api/usageManagement/v4", usageRoutes);

app.get("/", (req, res) => {
  res.send("Omini API Server is running ✅");
});

module.exports = app;

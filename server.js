const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const app = require("./src/app");

dotenv.config();

// Connect DB
connectDB();

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`TMF678 API running: http://localhost:${PORT}/tmf-api/customerBillManagement/v5`);
});

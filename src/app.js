const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

// Connect DB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const vasRoutes = require('./BBVAS/AddVASDataBundlePrepaidInit/routes/vasDataBundle.routes.js');
app.use("/", vasRoutes);

module.exports = app;

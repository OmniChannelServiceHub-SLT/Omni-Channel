const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const serviceRequestRoutes = require('./Fault/CreateServiceRequest/routes/serviceRequest.routes');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/', serviceRequestRoutes);

// Connect to DB
connectDB();

module.exports = app;

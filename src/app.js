const express = require('express');
const connectDB = require('./config/db');
const promotionRoutes = require('./BBVAS/FreeData/routes/promotionRoutes.js');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB Connection
connectDB();

// Routes
app.use('/tmf-api/promotionManagement/v4/promotion', promotionRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('🚀 Omni API Server is running ✅');
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;

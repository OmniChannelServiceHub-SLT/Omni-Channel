const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Replaces body-parser.json()

// Routes
app.use('/tmf-api/productOrdering/v4', require('./BBVAS/DataGiftEnroll/routes/dataGiftEnroll.routes'));

module.exports = app; // Export the Express app
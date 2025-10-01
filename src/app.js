const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const billRoutes = require('./EBill/BillDownloadRequest/routes/billDownloadRoutes');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// Base API route (matches the URL you posted)
const basePath = '/tmf-api/customerBillManagement/v5';
app.use(basePath, billRoutes);

// simple health endpoint
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// 404 handler
app.use((req, res) => res.status(404).json({ error: 'Not found' }));

module.exports = app;

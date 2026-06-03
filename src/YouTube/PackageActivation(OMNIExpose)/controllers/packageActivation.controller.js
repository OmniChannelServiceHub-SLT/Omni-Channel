// ============================================================
//  controllers/packageActivation.controller.js
//  Handles POST /omniexpose/packageActivation
//  (service/business logic included directly — no services folder)
// ============================================================

const axios = require('axios');
const { buildTMF638ServiceResponse } = require('../models/packageActivation.model');

// ── Config (from .env) ────────────────────────────────────────
const OMNI_BASE_URL      = process.env.OMNI_BASE_URL      || 'https://omni-backend.slt.lk';
const OMNI_API_KEY       = process.env.OMNI_API_KEY       || '';
const REQUEST_TIMEOUT_MS = parseInt(process.env.REQUEST_TIMEOUT_MS || '10000', 10);

// ── Helper: create structured error ──────────────────────────
const createError = (statusCode, status, message, details = null) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  err.status     = status;
  if (details) err.details = details;
  return err;
};

// ── Business Logic (merged from service layer) ────────────────
const processActivation = async (telephoneNo, packageId) => {
  let downstreamResponse;

  try {
    downstreamResponse = await axios.post(
      `${OMNI_BASE_URL}/api/packageActivation`,
      null,
      {
        params: { telephoneno: telephoneNo, packageid: packageId },
        headers: {
          'Content-Type': 'application/json',
          ...(OMNI_API_KEY && { 'x-api-key': OMNI_API_KEY }),
        },
        timeout: REQUEST_TIMEOUT_MS,
      }
    );
  } catch (err) {
    if (err.response) {
      const { status, data } = err.response;
      if (status === 404) throw createError(404, 'Not Found', `Telephone number ${telephoneNo} or package ${packageId} not found.`);
      if (status === 409) throw createError(409, 'Conflict', `Package ${packageId} is already active for ${telephoneNo}.`);
      if (status === 422) throw createError(422, 'Unprocessable Entity', 'Package activation rejected by the downstream system.', data);
      throw createError(502, 'Bad Gateway', 'Downstream activation system returned an error.', data);
    }
    if (err.code === 'ECONNABORTED' || err.code === 'ETIMEDOUT') {
      throw createError(504, 'Gateway Timeout', 'Downstream activation system did not respond in time.');
    }
    throw createError(503, 'Service Unavailable', 'Could not reach the downstream activation system.');
  }

  const extraData = downstreamResponse.data
    ? { _rawDownstreamResponse: downstreamResponse.data }
    : {};

  return buildTMF638ServiceResponse(telephoneNo, packageId, 'active', extraData);
};

// ── Controller ────────────────────────────────────────────────
const activatePackage = async (req, res) => {
  const { telephoneno, packageid } = req.query;

  try {
    const result = await processActivation(telephoneno.trim(), packageid.trim());
    return res.status(201).json(result);

  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        code: error.statusCode,
        status: error.status,
        message: error.message,
        ...(error.details && { details: error.details }),
      });
    }

    console.error('[PackageActivation] Unexpected error:', error);
    return res.status(500).json({
      code: 500,
      status: 'Internal Server Error',
      message: 'An unexpected error occurred while processing the package activation.',
    });
  }
};

module.exports = { activatePackage };

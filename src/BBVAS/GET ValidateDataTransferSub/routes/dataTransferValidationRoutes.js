const express = require('express');
const router = express.Router();
const dataTransferValidationController = require('../controllers/dataTransferValidationController');

/**
 * TMF640 v4.0.0 Data Transfer Validation Routes
 * 
 * These routes implement the ValidateDataTransferSub functionality
 * using TMF640 Service Activation & Configuration API standards.
 */

/**
 * GET /ValidateDataTransferSub
 * Validate data transfer between subscriber and receiver
 * 
 * Query Parameters:
 * - subscriberId: Subscriber ID (required)
 * - receiver: Receiver ID (required)
 * - fields: Comma-separated list of fields to return
 * 
 * TMF640 Compliance:
 * - Maps subscriberId and receiver to serviceCharacteristic
 * - Maps to relatedParty with roles 'Subscriber' and 'Receiver'
 * - Returns Service resource with state 'feasibilityChecked'
 * 
 * Example:
 * GET /ValidateDataTransferSub?subscriberId=cen2431747&receiver=94382222802
 * 
 * Response:
 * {
 *   "id": "validate-001",
 *   "href": "/ValidateDataTransferSub/validate-001",
 *   "name": "DataTransferValidation",
 *   "state": "feasibilityChecked",
 *   "serviceCharacteristic": [
 *     {
 *       "name": "subscriberId",
 *       "value": "cen2431747",
 *       "valueType": "string"
 *     },
 *     {
 *       "name": "receiver",
 *       "value": "94382222802",
 *       "valueType": "string"
 *     }
 *   ],
 *   "relatedParty": [
 *     {
 *       "id": "cen2431747",
 *       "role": "Subscriber",
 *       "@referredType": "PartyRole"
 *     },
 *     {
 *       "id": "94382222802",
 *       "role": "Receiver",
 *       "@referredType": "PartyRole"
 *     }
 *   ]
 * }
 */
router.get('/', dataTransferValidationController.validateDataTransfer);

/**
 * GET /ValidateDataTransferSub/{id}
 * Get validation record by ID
 * 
 * Path Parameters:
 * - id: Validation record ID
 * 
 * Query Parameters:
 * - fields: Comma-separated list of fields to return
 * 
 * Example:
 * GET /ValidateDataTransferSub/validate-001?fields=id,href,state,serviceCharacteristic
 */
router.get('/:id', dataTransferValidationController.getValidationById);

/**
 * GET /ValidateDataTransferSub/list
 * List validation records with filtering
 * 
 * Query Parameters:
 * - subscriberId: Filter by subscriber ID
 * - receiver: Filter by receiver ID
 * - state: Filter by state
 * - isValid: Filter by validation status
 * - fields: Comma-separated list of fields to return
 * 
 * Example:
 * GET /ValidateDataTransferSub/list?subscriberId=cen2431747&state=feasibilityChecked
 */
router.get('/list', dataTransferValidationController.listValidations);

/**
 * GET /ValidateDataTransferSub/health
 * Health check endpoint for data transfer validation service
 */
router.get('/health', dataTransferValidationController.healthCheck);

module.exports = router;

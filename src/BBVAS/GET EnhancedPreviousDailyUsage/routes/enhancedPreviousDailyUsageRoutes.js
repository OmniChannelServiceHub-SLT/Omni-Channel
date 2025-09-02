const express = require('express');
const router = express.Router();
const enhancedPreviousDailyUsageController = require('../controllers/enhancedPreviousDailyUsageController');

/**
 * TMF635 v4.0.0 Enhanced Previous Daily Usage Routes
 * 
 * These routes implement the EnhancedPreviousDailyUsage functionality
 * using TMF635 standards while maintaining backward compatibility.
 */

/**
 * GET /tmf-api/usageManagement/v4/enhancedPreviousDailyUsage
 * List enhanced previous daily usage records with TMF635 filtering
 * 
 * Query Parameters:
 * - fields: Comma-separated list of fields to return
 * - relatedParty.id: Filter by subscriber ID (maps to old subscriberID)
 * - usageDate: Filter by specific date (maps to old billDate)
 * - validFor.startDateTime: Filter by start date/time
 * - validFor.endDateTime: Filter by end date/time
 * - usageType: Filter by usage type
 * - status: Filter by status
 * - monthIndex: Filter by month index (for backward compatibility)
 * 
 * Example:
 * GET /tmf-api/usageManagement/v4/enhancedPreviousDailyUsage?fields=id,href,status,usageType,usageDate&relatedParty.id=94112179676&usageDate=2020-11-20
 */
router.get('/', enhancedPreviousDailyUsageController.list);

/**
 * GET /tmf-api/usageManagement/v4/enhancedPreviousDailyUsage/{id}
 * Get enhanced previous daily usage record by ID
 * 
 * Path Parameters:
 * - id: Usage record ID
 * 
 * Query Parameters:
 * - fields: Comma-separated list of fields to return
 * 
 * Example:
 * GET /tmf-api/usageManagement/v4/enhancedPreviousDailyUsage/5130d5131a23?fields=id,href,ratedProductUsage,relatedParty
 */
router.get('/:id', enhancedPreviousDailyUsageController.getById);

/**
 * GET /tmf-api/usageManagement/v4/enhancedPreviousDailyUsage/legacy/subscriber
 * Legacy endpoint for backward compatibility
 * Maps old API parameters to TMF635 format
 * 
 * Query Parameters:
 * - subscriberID: Subscriber ID (required)
 * - billDate: Bill date (maps to usageDate)
 * - monthIndex: Month index
 * - fields: Comma-separated list of fields to return
 * 
 * Example:
 * GET /tmf-api/usageManagement/v4/enhancedPreviousDailyUsage/legacy/subscriber?subscriberID=94112179676&billDate=2020-11-20&monthIndex=11
 */
router.get('/legacy/subscriber', enhancedPreviousDailyUsageController.getBySubscriberLegacy);

/**
 * GET /tmf-api/usageManagement/v4/enhancedPreviousDailyUsage/health
 * Health check endpoint for enhanced previous daily usage service
 */
router.get('/health', enhancedPreviousDailyUsageController.healthCheck);

module.exports = router;

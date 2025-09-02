const enhancedPreviousDailyUsageService = require('../services/enhancedPreviousDailyUsageService');

class EnhancedPreviousDailyUsageController {
  /**
   * List enhanced previous daily usage records
   * GET /tmf-api/usageManagement/v4/enhancedPreviousDailyUsage
   * Supports TMF635 filtering: fields, relatedParty.id, usageDate, validFor.startDateTime, validFor.endDateTime, usageType, status, monthIndex
   */
  async list(req, res) {
    try {
      const { fields, ...filters } = req.query || {};
      const fieldList = enhancedPreviousDailyUsageService.parseFieldsParam(fields);
      
      const result = await enhancedPreviousDailyUsageService.listEnhancedPreviousDailyUsage(filters, fieldList);
      
      // Return TMF635 compliant response
      return res.status(200).json(result);
    } catch (err) {
      console.error('Error in list enhanced previous daily usage:', err);
      return res.status(500).json({ 
        error: 'Internal Server Error', 
        details: err.message,
        '@type': 'Error',
        '@baseType': 'Error'
      });
    }
  }

  /**
   * Get enhanced previous daily usage record by ID
   * GET /tmf-api/usageManagement/v4/enhancedPreviousDailyUsage/{id}
   * Supports TMF635 field selection
   */
  async getById(req, res) {
    try {
      const { fields } = req.query || {};
      const fieldList = enhancedPreviousDailyUsageService.parseFieldsParam(fields);
      
      const usage = await enhancedPreviousDailyUsageService.getEnhancedPreviousDailyUsageById(req.params.id, fieldList);
      
      if (!usage) {
        return res.status(404).json({ 
          error: 'Enhanced Previous Daily Usage not found',
          '@type': 'Error',
          '@baseType': 'Error'
        });
      }
      
      // Return TMF635 compliant response
      return res.status(200).json(usage);
    } catch (err) {
      console.error('Error in get enhanced previous daily usage by ID:', err);
      return res.status(500).json({ 
        error: 'Internal Server Error', 
        details: err.message,
        '@type': 'Error',
        '@baseType': 'Error'
      });
    }
  }

  /**
   * Legacy endpoint for backward compatibility
   * GET /tmf-api/usageManagement/v4/enhancedPreviousDailyUsage/legacy/subscriber
   * Maps old API parameters to TMF635 format
   */
  async getBySubscriberLegacy(req, res) {
    try {
      const { subscriberID, billDate, monthIndex, fields } = req.query || {};
      
      if (!subscriberID) {
        return res.status(400).json({ 
          error: 'subscriberID is required',
          '@type': 'Error',
          '@baseType': 'Error'
        });
      }
      
      const fieldList = enhancedPreviousDailyUsageService.parseFieldsParam(fields);
      
      const result = await enhancedPreviousDailyUsageService.getDailyUsageBySubscriber(
        subscriberID, 
        billDate, 
        monthIndex
      );
      
      // Apply field selection if specified
      let finalResult = result;
      if (fieldList && fieldList.length > 0) {
        finalResult = result.map(record => {
          const filteredRecord = {};
          fieldList.forEach(field => {
            if (record.hasOwnProperty(field)) {
              filteredRecord[field] = record[field];
            }
          });
          return filteredRecord;
        });
      }
      
      // Return TMF635 compliant response
      return res.status(200).json(finalResult);
    } catch (err) {
      console.error('Error in legacy subscriber endpoint:', err);
      return res.status(500).json({ 
        error: 'Internal Server Error', 
        details: err.message,
        '@type': 'Error',
        '@baseType': 'Error'
      });
    }
  }

  /**
   * Health check endpoint for enhanced previous daily usage service
   */
  async healthCheck(req, res) {
    try {
      return res.status(200).json({
        status: 'healthy',
        service: 'Enhanced Previous Daily Usage',
        version: '4.0.0',
        timestamp: new Date().toISOString(),
        '@type': 'HealthCheck',
        '@baseType': 'HealthCheck'
      });
    } catch (err) {
      return res.status(500).json({
        status: 'unhealthy',
        service: 'Enhanced Previous Daily Usage',
        error: err.message,
        '@type': 'Error',
        '@baseType': 'Error'
      });
    }
  }
}

module.exports = new EnhancedPreviousDailyUsageController();

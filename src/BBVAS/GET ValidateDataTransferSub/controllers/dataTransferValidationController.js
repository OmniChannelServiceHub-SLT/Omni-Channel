const dataTransferValidationService = require('../services/dataTransferValidationService');

class DataTransferValidationController {
  /**
   * Validate data transfer between subscriber and receiver
   * GET /ValidateDataTransferSub
   * 
   * Query Parameters:
   * - subscriberId: Subscriber ID (required)
   * - receiver: Receiver ID (required)
   * - fields: Comma-separated list of fields to return
   * 
   * Example:
   * GET /ValidateDataTransferSub?subscriberId=cen2431747&receiver=94382222802
   * 
   * TMF640 Compliance:
   * - Maps subscriberId and receiver to serviceCharacteristic
   * - Maps to relatedParty with roles 'Subscriber' and 'Receiver'
   * - Returns Service resource with state 'feasibilityChecked'
   */
  async validateDataTransfer(req, res) {
    try {
      const { subscriberId, receiver, fields } = req.query || {};
      
      // Validate required parameters
      if (!subscriberId) {
        return res.status(400).json({
          code: '400',
          reason: 'Missing subscriberId',
          message: 'subscriberId is required for validation',
          '@type': 'Error',
          '@baseType': 'Error'
        });
      }
      
      if (!receiver) {
        return res.status(400).json({
          code: '400',
          reason: 'Missing receiver',
          message: 'receiver is required for validation',
          '@type': 'Error',
          '@baseType': 'Error'
        });
      }
      
      // Parse fields parameter for TMF640 compliance
      const fieldList = dataTransferValidationService.parseFieldsParam(fields);
      
      // Perform validation
      const validationResult = await dataTransferValidationService.validateDataTransfer(
        subscriberId, 
        receiver
      );
      
      // Apply field selection if specified
      let finalResult = validationResult;
      if (fieldList && fieldList.length > 0) {
        finalResult = {};
        fieldList.forEach(field => {
          if (validationResult.hasOwnProperty(field)) {
            finalResult[field] = validationResult[field];
          }
        });
      }
      
      // Return TMF640 compliant response
      return res.status(200).json(finalResult);
      
    } catch (err) {
      console.error('Error in validateDataTransfer:', err);
      return res.status(500).json({
        code: '500',
        reason: 'Internal Server Error',
        message: 'An error occurred during validation',
        details: err.message,
        '@type': 'Error',
        '@baseType': 'Error'
      });
    }
  }

  /**
   * Get validation record by ID
   * GET /ValidateDataTransferSub/{id}
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
  async getValidationById(req, res) {
    try {
      const { fields } = req.query || {};
      const fieldList = dataTransferValidationService.parseFieldsParam(fields);
      
      const validation = await dataTransferValidationService.getValidationById(
        req.params.id, 
        fieldList
      );
      
      if (!validation) {
        return res.status(404).json({
          code: '404',
          reason: 'Validation Not Found',
          message: `Validation record with ID ${req.params.id} not found`,
          '@type': 'Error',
          '@baseType': 'Error'
        });
      }
      
      return res.status(200).json(validation);
      
    } catch (err) {
      console.error('Error in getValidationById:', err);
      return res.status(500).json({
        code: '500',
        reason: 'Internal Server Error',
        message: 'An error occurred while retrieving validation',
        details: err.message,
        '@type': 'Error',
        '@baseType': 'Error'
      });
    }
  }

  /**
   * List validation records with filtering
   * GET /ValidateDataTransferSub/list
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
  async listValidations(req, res) {
    try {
      const { fields, ...filters } = req.query || {};
      const fieldList = dataTransferValidationService.parseFieldsParam(fields);
      
      const validations = await dataTransferValidationService.listValidations(filters, fieldList);
      
      // Return TMF640 compliant response
      return res.status(200).json({
        '@type': 'Service',
        '@baseType': 'Service',
        '@schemaLocation': 'https://tmforum.org/schema/Service',
        service: validations
      });
      
    } catch (err) {
      console.error('Error in listValidations:', err);
      return res.status(500).json({
        code: '500',
        reason: 'Internal Server Error',
        message: 'An error occurred while listing validations',
        details: err.message,
        '@type': 'Error',
        '@baseType': 'Error'
      });
    }
  }

  /**
   * Health check endpoint
   * GET /ValidateDataTransferSub/health
   */
  async healthCheck(req, res) {
    try {
      return res.status(200).json({
        status: 'OK',
        service: 'DataTransferValidation',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        '@type': 'HealthCheck',
        '@baseType': 'HealthCheck'
      });
    } catch (err) {
      console.error('Error in healthCheck:', err);
      return res.status(500).json({
        code: '500',
        reason: 'Health Check Failed',
        message: 'Service health check failed',
        details: err.message,
        '@type': 'Error',
        '@baseType': 'Error'
      });
    }
  }
}

module.exports = new DataTransferValidationController();

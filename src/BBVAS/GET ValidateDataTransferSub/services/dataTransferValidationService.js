const DataTransferValidation = require('../models/DataTransferValidationModel');

class DataTransferValidationService {
  /**
   * Parse and validate fields parameter for TMF640 compliance
   * @param {string} fieldsParam - Comma-separated field list
   * @returns {Array|null} Array of field names or null
   */
  parseFieldsParam(fieldsParam) {
    if (!fieldsParam) return null;
    if (typeof fieldsParam !== 'string') return null;
    return fieldsParam
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
  }

  /**
   * Generate a unique validation ID
   * @returns {string} Unique validation ID
   */
  generateValidationId() {
    return `validate-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Build TMF640 compliant service characteristics from query parameters
   * @param {string} subscriberId - Subscriber ID
   * @param {string} receiver - Receiver ID
   * @returns {Array} Array of service characteristics
   */
  buildServiceCharacteristics(subscriberId, receiver) {
    const characteristics = [];
    
    if (subscriberId) {
      characteristics.push({
        name: 'subscriberId',
        value: subscriberId,
        valueType: 'string',
        '@type': 'Characteristic'
      });
    }
    
    if (receiver) {
      characteristics.push({
        name: 'receiver',
        value: receiver,
        valueType: 'string',
        '@type': 'Characteristic'
      });
    }
    
    return characteristics;
  }

  /**
   * Build TMF640 compliant related parties
   * @param {string} subscriberId - Subscriber ID
   * @param {string} receiver - Receiver ID
   * @returns {Array} Array of related parties
   */
  buildRelatedParties(subscriberId, receiver) {
    const relatedParties = [];
    
    if (subscriberId) {
      relatedParties.push({
        id: subscriberId,
        role: 'Subscriber',
        '@referredType': 'PartyRole'
      });
    }
    
    if (receiver) {
      relatedParties.push({
        id: receiver,
        role: 'Receiver',
        '@referredType': 'PartyRole'
      });
    }
    
    return relatedParties;
  }

  /**
   * Validate data transfer between subscriber and receiver
   * @param {string} subscriberId - Subscriber ID
   * @param {string} receiver - Receiver ID
   * @returns {Promise<Object>} Validation result
   */
  async validateDataTransfer(subscriberId, receiver) {
    try {
      // Generate unique validation ID
      const validationId = this.generateValidationId();
      
      // Build TMF640 compliant service characteristics
      const serviceCharacteristics = this.buildServiceCharacteristics(subscriberId, receiver);
      
      // Build TMF640 compliant related parties
      const relatedParties = this.buildRelatedParties(subscriberId, receiver);
      
      // Perform validation logic (simplified for demonstration)
      // In a real implementation, this would check against business rules
      const isValid = subscriberId && receiver && 
                     subscriberId.length > 0 && 
                     receiver.length > 0;
      
      // Create validation record
      const validationRecord = new DataTransferValidation({
        id: validationId,
        href: `/ValidateDataTransferSub/${validationId}`,
        name: 'DataTransferValidation',
        description: `Data transfer validation between subscriber ${subscriberId} and receiver ${receiver}`,
        state: isValid ? 'feasibilityChecked' : 'inactive',
        serviceCharacteristic: serviceCharacteristics,
        relatedParty: relatedParties,
        serviceSpecification: {
          id: 'data-transfer-spec',
          name: 'DataTransferService',
          version: '1.0.0'
        },
        validFor: {
          startDateTime: new Date(),
          endDateTime: new Date(Date.now() + 24 * 60 * 60 * 1000) // Valid for 24 hours
        },
        // Backward compatibility fields
        subscriberId,
        receiverId: receiver,
        validationDate: new Date(),
        isValid,
        '@type': 'Service',
        '@baseType': 'Service',
        '@schemaLocation': 'https://tmforum.org/schema/Service'
      });
      
      // Save to database
      await validationRecord.save();
      
      return validationRecord.toObject();
    } catch (error) {
      console.error('Error in validateDataTransfer:', error);
      throw error;
    }
  }

  /**
   * Get validation record by ID with field selection
   * @param {string} id - Validation ID
   * @param {Array} fields - Fields to select
   * @returns {Promise<Object|null>} Validation record
   */
  async getValidationById(id, fields = null) {
    try {
      let query = DataTransferValidation.findOne({ id }).lean();
      
      if (fields && Array.isArray(fields) && fields.length > 0) {
        const projection = fields.reduce((acc, key) => {
          acc[key] = 1;
          return acc;
        }, {});
        query = query.select(projection);
      }
      
      return await query.exec();
    } catch (error) {
      console.error('Error in getValidationById:', error);
      throw error;
    }
  }

  /**
   * List validation records with filtering
   * @param {Object} filters - Filter criteria
   * @param {Array} fields - Fields to select
   * @returns {Promise<Array>} Array of validation records
   */
  async listValidations(filters = {}, fields = null) {
    try {
      const mongoFilter = {};
      
      // Apply filters
      if (filters.subscriberId) {
        mongoFilter.subscriberId = filters.subscriberId;
      }
      
      if (filters.receiver) {
        mongoFilter.receiverId = filters.receiver;
      }
      
      if (filters.state) {
        mongoFilter.state = filters.state;
      }
      
      if (filters.isValid !== undefined) {
        mongoFilter.isValid = filters.isValid;
      }
      
      let query = DataTransferValidation.find(mongoFilter).lean();
      
      if (fields && Array.isArray(fields) && fields.length > 0) {
        const projection = fields.reduce((acc, key) => {
          acc[key] = 1;
          return acc;
        }, {});
        query = query.select(projection);
      }
      
      return await query.exec();
    } catch (error) {
      console.error('Error in listValidations:', error);
      throw error;
    }
  }
}

module.exports = new DataTransferValidationService();

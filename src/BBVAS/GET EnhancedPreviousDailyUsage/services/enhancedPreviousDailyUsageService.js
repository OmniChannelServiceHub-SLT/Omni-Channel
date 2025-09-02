const EnhancedPreviousDailyUsage = require('../models/EnhancedPreviousDailyUsageModel');

class EnhancedPreviousDailyUsageService {
  /**
   * Parse and validate fields parameter for TMF635 compliance
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
   * Build MongoDB filter from TMF635 query parameters
   * @param {Object} queryParams - Query parameters from request
   * @returns {Object} MongoDB filter object
   */
  buildMongoFilter(queryParams) {
    const filter = {};

    // Handle relatedParty.id filter (maps to subscriberID in old API)
    if (queryParams['relatedParty.id']) {
      filter['relatedParty.id'] = queryParams['relatedParty.id'];
    }

    // Handle usageDate filter (maps to billDate in old API)
    if (queryParams.usageDate) {
      const date = new Date(queryParams.usageDate);
      if (!isNaN(date.getTime())) {
        // Filter for the specific date (start of day to end of day)
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        
        filter.usageDate = {
          $gte: startOfDay,
          $lte: endOfDay
        };
      }
    }

    // Handle validFor.startDateTime filter
    if (queryParams['validFor.startDateTime']) {
      const startDate = new Date(queryParams['validFor.startDateTime']);
      if (!isNaN(startDate.getTime())) {
        filter['validFor.startDateTime'] = { $gte: startDate };
      }
    }

    // Handle validFor.endDateTime filter
    if (queryParams['validFor.endDateTime']) {
      const endDate = new Date(queryParams['validFor.endDateTime']);
      if (!isNaN(endDate.getTime())) {
        filter['validFor.endDateTime'] = { $lte: endDate };
      }
    }

    // Handle usageType filter
    if (queryParams.usageType) {
      filter.usageType = queryParams.usageType;
    }

    // Handle status filter
    if (queryParams.status) {
      filter.status = queryParams.status;
    }

    // Handle monthIndex filter (for backward compatibility)
    if (queryParams.monthIndex) {
      const monthIndex = parseInt(queryParams.monthIndex);
      if (!isNaN(monthIndex)) {
        filter.monthIndex = monthIndex;
      }
    }

    return filter;
  }

  /**
   * List enhanced previous daily usage records with TMF635 filtering
   * @param {Object} queryParams - Query parameters
   * @param {Array} fields - Fields to select
   * @returns {Promise<Array>} Array of usage records
   */
  async listEnhancedPreviousDailyUsage(queryParams = {}, fields = null) {
    try {
      const mongoFilter = this.buildMongoFilter(queryParams);
      
      let query = EnhancedPreviousDailyUsage.find(mongoFilter).lean();

      // Handle field selection for TMF635 compliance
      if (fields && Array.isArray(fields) && fields.length > 0) {
        const projection = fields.reduce((acc, key) => {
          acc[key] = 1;
          return acc;
        }, { _id: 0 });
        query = query.select(projection);
      } else {
        query = query.select({ _id: 0 });
      }

      // Sort by usageDate descending (most recent first)
      query = query.sort({ usageDate: -1 });

      const result = await query.exec();
      return result;
    } catch (error) {
      throw new Error(`Failed to list enhanced previous daily usage: ${error.message}`);
    }
  }

  /**
   * Get enhanced previous daily usage record by ID
   * @param {string} id - Usage record ID
   * @param {Array} fields - Fields to select
   * @returns {Promise<Object|null>} Usage record or null
   */
  async getEnhancedPreviousDailyUsageById(id, fields = null) {
    try {
      let query = EnhancedPreviousDailyUsage.findOne({ id }).lean();

      if (fields && Array.isArray(fields) && fields.length > 0) {
        const projection = fields.reduce((acc, key) => {
          acc[key] = 1;
          return acc;
        }, { _id: 0 });
        query = query.select(projection);
      } else {
        query = query.select({ _id: 0 });
      }

      const result = await query.exec();
      return result;
    } catch (error) {
      throw new Error(`Failed to get enhanced previous daily usage by ID: ${error.message}`);
    }
  }

  /**
   * Get daily usage summary for a subscriber (equivalent to old API functionality)
   * @param {string} subscriberId - Subscriber ID
   * @param {Date} billDate - Bill date
   * @param {number} monthIndex - Month index
   * @returns {Promise<Array>} Array of daily usage records
   */
  async getDailyUsageBySubscriber(subscriberId, billDate, monthIndex) {
    try {
      const filter = {};
      
      if (subscriberId) {
        filter['relatedParty.id'] = subscriberId;
      }
      
      if (billDate) {
        const date = new Date(billDate);
        if (!isNaN(date.getTime())) {
          const startOfDay = new Date(date);
          startOfDay.setHours(0, 0, 0, 0);
          const endOfDay = new Date(date);
          endOfDay.setHours(23, 59, 59, 999);
          
          filter.usageDate = {
            $gte: startOfDay,
            $lte: endOfDay
          };
        }
      }
      
      if (monthIndex !== undefined && monthIndex !== null) {
        filter.monthIndex = monthIndex;
      }

      const result = await EnhancedPreviousDailyUsage.find(filter)
        .select({ _id: 0 })
        .sort({ usageDate: -1 })
        .lean()
        .exec();

      return result;
    } catch (error) {
      throw new Error(`Failed to get daily usage by subscriber: ${error.message}`);
    }
  }
}

module.exports = new EnhancedPreviousDailyUsageService();

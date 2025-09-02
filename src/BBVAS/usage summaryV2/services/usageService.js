const Usage = require('../models/Usage');

class UsageService {
  async listUsages(filter = {}, fields = null) {
    const mongoFilter = { ...filter };

    if (mongoFilter.fields) {
      delete mongoFilter.fields;
    }

    let query = Usage.find(mongoFilter).lean();

    if (fields && Array.isArray(fields) && fields.length > 0) {
      const projection = fields.reduce((acc, key) => {
        acc[key] = 1;
        return acc;
      }, { _id: 0 });
      query = query.select(projection);
    } else {
      query = query.select({ _id: 0 });
    }

    return query.exec();
  }

  async getUsageById(id, fields = null) {
    let query = Usage.findOne({ id }).lean();

    if (fields && Array.isArray(fields) && fields.length > 0) {
      const projection = fields.reduce((acc, key) => {
        acc[key] = 1;
        return acc;
      }, { _id: 0 });
      query = query.select(projection);
    } else {
      query = query.select({ _id: 0 });
    }

    return query.exec();
  }
}

module.exports = new UsageService();



const usageService = require('../services/usageService');

function parseFieldsParam(fieldsParam) {
  if (!fieldsParam) return null;
  if (typeof fieldsParam !== 'string') return null;
  return fieldsParam
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
}

class UsageController {
  async list(req, res) {
    try {
      const { fields, ...filters } = req.query || {};
      const fieldList = parseFieldsParam(fields);
      const result = await usageService.listUsages(filters, fieldList);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }

  async getById(req, res) {
    try {
      const { fields } = req.query || {};
      const fieldList = parseFieldsParam(fields);
      const usage = await usageService.getUsageById(req.params.id, fieldList);
      if (!usage) {
        return res.status(404).json({ error: 'Usage not found' });
      }
      return res.status(200).json(usage);
    } catch (err) {
      return res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }
}

module.exports = new UsageController();



const SalesLead = require('../models/SalesLead');

async function createSalesLead(data) {
  const salesLead = new SalesLead(data);
  return await salesLead.save();
}

module.exports = { createSalesLead };

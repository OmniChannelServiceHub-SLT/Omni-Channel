// controllers/ServiceController.js
const { fetchServiceStatus } = require("../services/ServiceInventoryService.js");

async function getServiceStatus(req, res) {
  const { accountNo, tpNo } = req.query;

  if (!accountNo || !tpNo) {
    return res.status(400).json({ error: "Missing required parameters: accountNo, tpNo" });
  }

  try {
    const service = await fetchServiceStatus(accountNo, tpNo);
    return res.status(200).json(service);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
module.exports = { getServiceStatus };
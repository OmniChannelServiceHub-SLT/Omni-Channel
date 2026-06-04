
const { buildTMF638ServiceResponse } = require('../models/packageActivation.model');
 
const activatePackage = async (req, res) => {
  const { telephoneno, packageid } = req.query;
 
  try {
    const result = buildTMF638ServiceResponse(
      telephoneno.trim(),
      packageid.trim(),
      'active'
    );
 
    return res.status(201).json(result);
 
  } catch (error) {
    console.error('[PackageActivation] Unexpected error:', error);
    return res.status(500).json({
      code: 500,
      status: 'Internal Server Error',
      message: 'An unexpected error occurred while processing the package activation.',
    });
  }
};
 
module.exports = { activatePackage };

const qualificationService = require('../services/qualification.service');

exports.getProductOfferingQualification = async (req, res) => {
  try {
    const { bbType, currentProductName } = req.query;

    if (!bbType || !currentProductName) {
      return res.status(400).json({
        code: "INVALID_REQUEST",
        reason: "Missing mandatory parameters",
        message: "bbType and currentProductName are required",
        status: "400"
      });
    }

    const results = await qualificationService.getQualifiedOfferings(
      bbType,
      currentProductName
    );

    console.log('QUERY PARAMS:', {
  bbType,
  currentProductName
});

console.log('DB RESULTS COUNT:', results.length);
console.log('DB RESULTS:', results);


    // ✅ Build the exact array you will return
const qualificationItems = results.map((item, index) => ({
  id: String(index + 1),
  qualificationResult: "qualified",
  category: item.category,
  productOffering: {
    name: item.productOffering.name,
    productOfferingCode: item.productOffering.productOfferingCode
  }
}));

console.log('Qualification Items:', qualificationItems);

    // ✅ Validate AFTER filtering
    if (!qualificationItems.length) {
      return res.status(404).json({
        code: "NOT_FOUND",
        reason: "No qualification results",
        message: "No eligible product offerings found",
        status: "404"
      });
    }

    return res.status(200).json({
      id: `poq-${Date.now()}`,
      "@type": "ProductOfferingQualification",
      qualificationItem: qualificationItems
    });

  } catch (err) {
    return res.status(500).json({
      code: "INTERNAL_ERROR",
      reason: "Server error",
      message: err.message,
      status: "500"
    });
  }
};

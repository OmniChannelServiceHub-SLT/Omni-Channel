const Usage = require("../models/summeryModel");
const { nanoid } = require("nanoid");

// exports.getUsageSummary = async (req, res) => {
//   try {
//     const { id } = req.query;
//     const baseUrl = `${req.protocol}://${req.get('host')}`;

//     // If no id provided, return list of all usages
//     if (!id) {
//       const usages = await Usage.find();
      
//       const response = {
//         id: "usagelist-" + nanoid(),
//         href: baseUrl + req.originalUrl,
//         usage: usages.map(usage => usage.toTMF635(baseUrl)),
//         "@type": "UsageList",
//         "@baseType": "Entity",
//         "@schemaLocation": `${baseUrl}/tmf-api/schema/Usage/UsageList.schema.json`
//       };

//       return res.status(200).json(response);
//     }

//     const usage = await Usage.findById(id);
//     if (!usage) {
//       return res.status(404).json({
//         code: "404",
//         reason: "Not Found",
//         message: `Usage with id=${id} not found`,
//         status: 404,
//         referenceError: null
//       });
//     }

//     return res.status(200).json(usage.toTMF635(baseUrl));
//   } catch (error) {
//     return res.status(500).json({
//       code: "500",
//       reason: "Internal Server Error",
//       message: error.message,
//       status: 500,
//       referenceError: null
//     });
//   }
// };

exports.getUsageById = async (req, res) => {
  try {
    const { id } = req.params; // id from URL
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const usage = await Usage.findById(id);
    if (!usage) {
      return res.status(404).json({
        code: "404",
        reason: "Not Found",
        message: `Usage with id=${id} not found`,
        status: 404,
        referenceError: null,
      });
    }

    // Return TMF aligned response
    return res.status(200).json(usage.toTMF635(baseUrl));
  } catch (error) {
    return res.status(500).json({
      code: "500",
      reason: "Internal Server Error",
      message: error.message,
      status: 500,
      referenceError: null,
    });
  }
};

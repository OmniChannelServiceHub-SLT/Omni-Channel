const Usage = require("../models/summeryModel");
const { nanoid } = require("nanoid");

exports.getUsageSummary = async (req, res) => {
  try {
    const { id, fields } = req.query;
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    // If no id provided, return all usages
    if (!id) {
      const usages = await Usage.find();
      const usageList = {
        id: "usagelist-" + nanoid(),
        href: baseUrl + req.originalUrl,
        usage: usages.map(usage => ({
          id: usage._id || nanoid(),
          href: `${baseUrl}/tmf-api/usageManagement/v4/usage/${usage._id}`,
          usageSpecification: {
            id: usage.usageSpecification?.id || "spec-001",
            href: `${baseUrl}/tmf-api/usageManagement/v4/usageSpecification/spec-001`,
            name: usage.usageSpecification?.name || "Default Usage Specification",
            "@type": "UsageSpecification"
          },
          description: usage.description || "Usage record",
          usageDate: usage.usageDate || new Date(),
          usageType: usage.usageType || "Data",
          status: usage.status || "received",
          "@type": "Usage",
          "@baseType": "Entity",
          "@schemaLocation": `${baseUrl}/tmf-api/schema/Usage/Usage.schema.json`
        })),
        "@type": "UsageList",
        "@baseType": "Entity",
        "@schemaLocation": `${baseUrl}/tmf-api/schema/Usage/UsageList.schema.json`
      };

      return res.status(200).json(usageList);
    }

    // If id is provided, return single usage
    const usage = await Usage.findById(id);
    if (!usage) {
      return res.status(404).json({
        code: "404",
        reason: "Not Found",
        message: `Usage with id=${id} not found`,
        status: 404,
        referenceError: null
      });
    }

    const response = {
      id: usage._id,
      href: `${baseUrl}/tmf-api/usageManagement/v4/usage/${usage._id}`,
      usageSpecification: {
        id: usage.usageSpecification?.id || "spec-001",
        href: `${baseUrl}/tmf-api/usageManagement/v4/usageSpecification/spec-001`,
        name: usage.usageSpecification?.name || "Default Usage Specification",
        "@type": "UsageSpecification"
      },
      description: usage.description || "Usage record",
      usageDate: usage.usageDate || new Date(),
      usageType: usage.usageType || "Data",
      status: usage.status || "received",
      "@type": "Usage",
      "@baseType": "Entity",
      "@schemaLocation": `${baseUrl}/tmf-api/schema/Usage/Usage.schema.json`
    };

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      code: "500",
      reason: "Internal Server Error",
      message: error.message,
      status: 500,
      referenceError: null
    });
  }
};

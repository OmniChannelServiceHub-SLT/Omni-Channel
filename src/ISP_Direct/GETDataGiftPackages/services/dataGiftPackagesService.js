const getDataGiftPackages = async (query = {}) => {
  const { subscriberid } = query;

  if (!subscriberid) {
    return {
      success: false,
      statusCode: 400,
      message: "subscriberid is required",
    };
  }

  // Dummy response (Replace with actual ISP API later)

  const packages = [
    {
      packageId: "DG100",
      packageName: "Gift 100GB",
      validity: "30 Days",
      price: 0,
      eligible: true,
    },
    {
      packageId: "DG50",
      packageName: "Gift 50GB",
      validity: "14 Days",
      price: 0,
      eligible: true,
    },
    {
      packageId: "DG10",
      packageName: "Gift 10GB",
      validity: "7 Days",
      price: 0,
      eligible: false,
    },
  ];

  return {
    success: true,
    statusCode: 200,
    message: "Data Gift Packages retrieved successfully",
    data: {
      subscriberid,
      packages,
    },
  };
};

module.exports = {
  getDataGiftPackages,
};
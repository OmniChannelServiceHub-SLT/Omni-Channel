const getDataGiftPackagesMobile = async (query = {}) => {
  const { subscriberid } = query;

  if (!subscriberid) {
    return {
      success: false,
      statusCode: 400,
      message: "subscriberid is required",
    };
  }

  // Dummy Mobile Data Gift Packages

  const packages = [
    {
      packageId: "MDG100",
      packageName: "Mobile Gift 100GB",
      validity: "30 Days",
      price: 0,
      eligible: true,
    },
    {
      packageId: "MDG50",
      packageName: "Mobile Gift 50GB",
      validity: "14 Days",
      price: 0,
      eligible: true,
    },
    {
      packageId: "MDG10",
      packageName: "Mobile Gift 10GB",
      validity: "7 Days",
      price: 0,
      eligible: false,
    },
  ];

  return {
    success: true,
    statusCode: 200,
    message: "Mobile Data Gift Packages retrieved successfully",
    data: {
      subscriberid,
      packages,
    },
  };
};

module.exports = {
  getDataGiftPackagesMobile,
};
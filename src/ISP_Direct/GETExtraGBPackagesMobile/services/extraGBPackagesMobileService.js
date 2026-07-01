const getExtraGBPackagesMobile = async (query = {}) => {
  const { basepackage } = query;

  if (!basepackage) {
    return {
      success: false,
      statusCode: 400,
      message: "basepackage is required",
    };
  }

  // Dummy response (Replace with actual API call later)

  const packages = [
    {
      packageId: "GB100",
      packageName: "100 GB Add-on",
      validity: "30 Days",
      price: 500,
    },
    {
      packageId: "GB200",
      packageName: "200 GB Add-on",
      validity: "30 Days",
      price: 850,
    },
  ];

  return {
    success: true,
    statusCode: 200,
    message: "Extra GB Packages retrieved successfully",
    data: {
      basepackage,
      packages,
    },
  };
};

module.exports = {
  getExtraGBPackagesMobile,
};
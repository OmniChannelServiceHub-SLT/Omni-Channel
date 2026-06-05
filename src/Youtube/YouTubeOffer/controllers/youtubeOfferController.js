const ALLOWED_VARIANTS = ["PackageActivation", "PackageActivationOSS"];

exports.packageActivation = async (req, res) => {
  try {
    const { telephone, packageId, offerCode, channel, variant } = req.body;

    if (!telephone) {
      return res.status(400).json({
        status: "FAILED",
        message: "telephone is required",
      });
    }

    if (!variant) {
      return res.status(400).json({
        status: "FAILED",
        message: "variant is required",
        allowedVariants: ALLOWED_VARIANTS,
      });
    }

    if (!ALLOWED_VARIANTS.includes(variant)) {
      return res.status(400).json({
        status: "FAILED",
        message: "Invalid variant",
        allowedVariants: ALLOWED_VARIANTS,
      });
    }

    const response = {
      status: "SUCCESS",
      message: "YouTube offer package activation successful",
      data: {
        transactionId: `YT-${Date.now()}`,
        telephone,
        packageId: packageId || null,
        offerCode: offerCode || null,
        channel: channel || "WEB",
        variant,
        activationStatus: "COMPLETED",
        activatedDate: new Date().toISOString(),
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error("YouTube offer activation error:", error);

    return res.status(500).json({
      status: "FAILED",
      message: "Internal server error",
    });
  }
};
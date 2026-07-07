const validateDataGiftSub = async (query = {}) => {
  const { receiver } = query;

  if (!receiver) {
    return {
      success: false,
      statusCode: 400,
      message: "receiver is required",
    };
  }

  // Dummy validation

  return {
    success: true,
    statusCode: 200,
    message: "Subscriber validation successful",
    data: {
      receiver,
      validSubscriber: true,
      subscriberName: "Nimal Perera",
      mobileNumber: receiver,
      accountStatus: "ACTIVE",
      eligibleForGift: true,
    },
  };
};

module.exports = {
  validateDataGiftSub,
};
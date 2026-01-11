const pushService = require('../services/pushNotification.service');

exports.sendPushNotification = async (req, res) => {
  try {
    const {
      accountNo,
      NotType,
      email,
      mobile
    } = req.body;

    if (!accountNo || !NotType || (!email && !mobile)) {
      return res.status(400).json(buildErrorResponse(
        'Invalid request payload',
        'Mandatory fields are missing'
      ));
    }

    const message = await pushService.processPushNotification(req.body);

    return res.status(200).json({
      isSuccess: true,
      errorMessege: null,
      exceptionDetail: null,
      dataBundle: {
        messageId: message._id,
        status: message.status
      },
      errorShow: null,
      errorCode: null
    });

  } catch (err) {
    return res.status(500).json(buildExceptionResponse(err));
  }
};

function buildExceptionResponse(err) {
  return {
    isSuccess: false,
    errorMessege: 'Exception occured while sending push notification for user',
    exceptionDetail: err.stack,
    dataBundle: null,
    errorShow: 'Sorry, the service is temporary unavailable. Please try again later.',
    errorCode: null
  };
}

function buildErrorResponse(message, detail) {
  return {
    isSuccess: false,
    errorMessege: message,
    exceptionDetail: detail,
    dataBundle: null,
    errorShow: message,
    errorCode: null
  };
}

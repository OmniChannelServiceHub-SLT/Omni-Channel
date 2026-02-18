const service = require("./facebookLoginAndroid.service");

exports.facebookLoginAndroid = async (req, res) => {
  try {
    const result = await service.execute(req.body);
    res.status(200).json(result);
  } catch (e) {
    res.status(e.status || 500).json({
      code: "AUTH-FB-ANDROID",
      reason: e.message,
      status: e.status || 500
    });
  }
};

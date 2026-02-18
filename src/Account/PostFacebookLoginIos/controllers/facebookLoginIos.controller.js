const service = require("./facebookLoginIos.service");

exports.facebookLoginIos = async (req, res) => {
  try {
    const result = await service.execute(req.body);
    res.status(200).json(result);
  } catch (e) {
    res.status(e.status || 500).json({
      code: "AUTH-FB-IOS",
      reason: e.message,
      status: e.status || 500
    });
  }
};

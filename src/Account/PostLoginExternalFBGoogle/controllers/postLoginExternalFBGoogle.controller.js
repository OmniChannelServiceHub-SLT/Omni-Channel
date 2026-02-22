// account.controller.js

const service = require("../services/postLoginExternalFBGoogle.service");

exports.loginExternal = async (req, res) => {
  try {
    const result = await service.execute(req.body);
    res.status(200).json(result);
  } catch (e) {
    res.status(e.status || 500).json({
      code: e.code || "AUTH-EXT-001",
      reason: e.message,
      status: e.status || 500
    });
  }
};

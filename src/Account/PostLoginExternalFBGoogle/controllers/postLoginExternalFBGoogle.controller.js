// account.controller.js
const service = require("../postLoginExternalFBGoogle.service");

exports.loginExternal = async (req, res) => {
  try {
    const result = await service.externalLogin(req.body);
    res.status(200).json(result);
  } catch (e) {
    res.status(e.status || 500).json(tmfError(e));
  }
};

/*exports.facebookLoginAndroid = async (req, res) => {
  try {
    const result = await service.externalLogin(req.body, "ANDROID");
    res.status(200).json(result);
  } catch (e) {
    res.status(e.status || 500).json(tmfError(e));
  }
};

exports.facebookLoginIos = async (req, res) => {
  try {
    const result = await service.externalLogin(req.body, "IOS");
    res.status(200).json(result);
  } catch (e) {
    res.status(e.status || 500).json(tmfError(e));
  }
};*/

function tmfError(e) {
  return {
    code: e.code || "AUTH-EXT-001",
    reason: e.message,
    status: e.status || 500
  };
}

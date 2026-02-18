// account.routes.js
const router = require("express").Router();
const controller = require("../postLoginExternalFBGoogle.controller");

router.post("/LoginExternal", controller.loginExternal);
router.post("/FacebookLoginAndroid", controller.facebookLoginAndroid);
router.post("/FacebookLoginIos", controller.facebookLoginIos);

module.exports = router;

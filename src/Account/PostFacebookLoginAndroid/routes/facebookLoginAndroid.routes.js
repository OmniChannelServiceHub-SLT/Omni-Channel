const router = require("express").Router();
const controller = require("./facebookLoginAndroid.controller");

router.post(
  "/api/Account/FacebookLoginAndroid",
  controller.facebookLoginAndroid
);

module.exports = router;

const router = require("express").Router();
const controller = require("./facebookLoginIos.controller");

router.post(
  "/api/Account/FacebookLoginIos",
  controller.facebookLoginIos
);

module.exports = router;

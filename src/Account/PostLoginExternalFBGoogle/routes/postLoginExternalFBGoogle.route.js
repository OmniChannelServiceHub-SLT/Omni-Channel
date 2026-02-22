// account.routes.js
const router = require("express").Router();
const controller = require("../controllers/postLoginExternalFBGoogle.controller");
const authMiddleware = require("../../../middleware/authMiddleware");

router.post("/", controller.loginExternal);

module.exports = router;

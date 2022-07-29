const router = require("express").Router();
const controller = require("../controller/authController");
router.post("/register", controller.registerController);
router.post("/login", controller.loginController);

module.exports = router;

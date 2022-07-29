const router = require("express").Router();
const authRouters = require("./auth");
const userRouters = require("./user");
const authenticate = require("../middleware/authenticate");

// auth router
router.use("/api/v1/auth", authRouters);

// user crud router
router.use("/users", authenticate, userRouters);

module.exports = router;

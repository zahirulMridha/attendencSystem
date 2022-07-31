const router = require("express").Router();
const authRouters = require("./auth");
const userRouters = require("./user");
const adminAttendanceRouters = require("./adminAttendance");
const studentRouter = require("../routes/studentAttendance");
const authenticate = require("../middleware/authenticate");

// auth router
router.use("/api/v1/auth", authRouters);
// user crud router
router.use("/users", authenticate, userRouters);
// adminAttendanceRouters
router.use("/admin/attendance", authenticate, adminAttendanceRouters);
// studentAttendance
router.use("/student/attendance", authenticate, studentRouter);

module.exports = router;

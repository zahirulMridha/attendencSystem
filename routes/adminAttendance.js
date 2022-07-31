const express = require("express");
const router = express.Router();
const attendanceController = require("../controller/adminAttendance");

// - *POST /admin/attendance/enable [private] 
// - *GET /admin/attendance/disabled/ [private]
// - *GET /admin/attendance/status/ [private]

router.post("/enable", attendanceController.enableAttendance);
router.get("/disabled/:adminId", attendanceController.disableAttendance);
router.get("/status", attendanceController.statusOfAttendance);

module.exports = router;

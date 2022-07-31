const express = require("express");
const router = express.Router();
const studentAttendance = require("../controller/studentAttendance");

//  GET/student/attendance/:id [private]
//  GET/student/attendance/status [private]
router.get("/status", studentAttendance.studentAttendanceStatus);
// note : params router always use under of others router(here got a error)
router.get("/:adminId", studentAttendance.GivenStudentAttendance);

module.exports = router;

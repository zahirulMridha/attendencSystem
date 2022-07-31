const studentModel = require("../models/studentAttendance");
const adminAttendenceModel = require("../models/adminAttendence");
const error = require("../utils/error");

const StudendAttendance = async (key, adminId, studentId, stringId) => {
  const checkAdmin = await adminAttendenceModel.findById({ [key]: adminId });
  if (!checkAdmin) {
    throw error(400, "admin id is not match");
  }

  if (checkAdmin.status == "COMPLETED") {
    throw error(400, "time is over");
  }
  const attendance = await studentModel.findOne({ adminId });
  let checkStudent;
  //check,if attendance have and get studentId into adminId because we can not assign double attendance
  if (attendance) {
    checkStudent = await studentModel.findOne({
      [stringId]: attendance.studentId,
    });
  }
  if (checkStudent) {
    throw error(400, "attendance already given");
  }

  const student = new studentModel({ adminId, studentId });

  return student.save();
};

const StudendAttendanceStatus = () => {
  return studentModel.find();
};

module.exports = { StudendAttendance, StudendAttendanceStatus };

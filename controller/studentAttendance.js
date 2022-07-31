const studentService = require("../services/studendAttendance");

const GivenStudentAttendance = async (req, res, next) => {
  const { adminId } = req.params;
  const studentId = req.user._id
  try {
    const student = await studentService.StudendAttendance("_id", adminId, studentId,"studentId");
    res.status(200).json({ message: "attendance is counted", student });
  } catch (err) {
    next(err);
  }
};

const studentAttendanceStatus = async (_req,res,next) => {
try{
  const status = await studentService.StudendAttendanceStatus()
  res.status(200).json({status})
}catch(err){
  next(err)
}
}




module.exports = {GivenStudentAttendance,studentAttendanceStatus};

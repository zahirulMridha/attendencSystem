const adminAttendance = require("../services/adminAttendance");

const enableAttendance = async (req, res, next) => {
  const { timeRange, status } = req.body;
  try {
    const attendance = await adminAttendance.enableService(timeRange, status);
    res.status(200).json({ message: "enable attendance", attendance });
  } catch (err) {
    next(err);
  }
};

const disableAttendance = async (req, res, next) => {
  const { adminId } = req.params;
  try {
    const attendanceStatus = await adminAttendance.disableService(
      "_id",
      adminId
    );
    res.status(201).json({ message: "disable attendance", attendanceStatus });
  } catch (err) {
    next(err);
  }
};
const statusOfAttendance = async (req, res, next) => {
  try {
    const status = await adminAttendance.attendanceStatus();
    res.status(200).json({ status });
  } catch (err) {
    next(err);
  }
};

module.exports = { enableAttendance, disableAttendance, statusOfAttendance };

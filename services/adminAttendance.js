const attendanceModel = require("../models/adminAttendence");
const error = require("../utils/error");
const { addMinutes, isAfter } = require("date-fns");

const enableService = async (timeRange, status) => {
  // Automatically disable(completed) by date fns
  //note: now we work only for one class attendance

  // check have any running attendance.
  const getAttendance = await attendanceModel.findOne({ status });
  if (getAttendance) {
    // add create time and time range by date-fns
    const started = addMinutes(
      new Date(getAttendance.createdAt),
      getAttendance.timeRange
    );
    // check attendance running time over or not
    const timeCompare = isAfter(new Date(), started);

    console.log(timeCompare);
    if (timeCompare) {
      getAttendance.status = "COMPLETED";
      await getAttendance.save();
    } else {
      throw error(400, "attendance already running");
    }
  }
  const attendance = new attendanceModel({ timeRange, status });
  return attendance.save();
};

const disableService = async (key, adminId) => {
  const getAttendance = await attendanceModel.findById({ [key]: adminId });
  if (!getAttendance) {
    throw error(400, "attendance id is invalid");
  }
  if (getAttendance.status === "COMPLETED") {
    throw error(400, " attendance already disable");
  }
  getAttendance.status = "COMPLETED";
  return getAttendance.save();
};

const attendanceStatus = async () => {
  const getAttendance = await attendanceModel.findOne({ status: "RUNNING" });
  if (getAttendance) {
    const started = addMinutes(
      new Date(getAttendance.createdAt),
      getAttendance.timeRange
    );
    const timeCompare = isAfter(new Date(), started);
    if (timeCompare) {
      getAttendance.status = "COMPLETED";
      await getAttendance.save();
    }
  }
  return attendanceModel.find();
};

module.exports = { enableService, disableService, attendanceStatus };

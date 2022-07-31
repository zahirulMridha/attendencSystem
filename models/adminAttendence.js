const mongoose = require("mongoose");

const adminAttendanceSchema = mongoose.Schema(
  {
    timeRange: {
      type: Number,
      max: 30,
      min: 1,
      default: 1,
      require: true,
    },
    status: {
      type: String,
      require: true,
      enum: ["RUNNING", "COMPLETED"],
      default: "RUNNING",
    },
  },
  { timestamps: true }
);

const adminAttendance = mongoose.model(
  "adminAttendance",
  adminAttendanceSchema
);

module.exports = adminAttendance;

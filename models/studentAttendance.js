const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
  {
    adminId: {
      type: String,
      require: true,
    },
    studentId: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const studentModel = mongoose.model("studentModel", studentSchema);

module.exports = studentModel;

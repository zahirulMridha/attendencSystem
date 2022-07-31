const mongoose = require("mongoose");

const conncteToDb = (connectString, option) => {
  return mongoose.connect(connectString, option);
};

module.exports = conncteToDb;

const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = require("./models/user");

mongoose
  .connect("mongodb://127.0.0.1:27017/test", { serverSelectionTimeoutMS: 1000 })
  .then(() => {
    console.log("connect to the mongodb");
  })
  .catch((e) => {
    console.log("there was server connection problem");
  });

const schema = new mongoose.Schema(userSchema);

const User = mongoose.model("User", schema);

module.exports = User;

const mongoose = require("mongoose");
const  {Schema}  = mongoose;
const userSchema = require("./models/user");

const schema = new mongoose.Schema(userSchema);

const User = mongoose.model("User", schema);

module.exports = User;

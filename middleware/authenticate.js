const error = require("../utils/error");
const jwt = require("jsonwebtoken");
const userService = require("../services/userService");

// create privet middleware by token
// which can use any privet route
const authenticate = async (req, _res, next) => {
  const token = req.headers.authenticate;
  if (!token) {
    throw error(400, "empty token ");
  }
  let user;
  try {
    // token decode (token code -> user info)
    const decode = await jwt.verify(token, "secret");
    // matching user into db
    console.log("auth");
    user = userService.userFindById("_id", decode._id);
  } catch (err) {
    if (!user) {
      throw error(400, "token is not matching");
    }
    next(err);
  }
  req.user = user;
  next();
};
module.exports = authenticate;

const error = require("../utils/error");
const userService = require("./userService");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authRegService = async ({ name, email, password, accountStatus }) => {
  // user = find user with email
  let user = await userService.userFindByEmail(email);
  if (user) {
    throw error(400, "user already exist");
  }
  // hash = hash password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  // create user
  return (user = userService.createUser({
    name,
    email,
    password: hash,
    accountStatus,
  }));
};
// TODO: create a userFindByProperty that work both way id or email
const authLogService = async (email, password) => {
  // user = find user with email
  let user = await userService.userFindByEmail(email);
  // if user not found:   return 400 error
  if (!user) {
    throw error(400, "you have no account");
  }
  // if password not equal to user hash: return 400 error
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw error(400, "password is not match");
  }
  const payload = {
    name: user.name,
    email: user.email,
    _id: user._id,
    roles: user.roles,
    accountStatus: user.accountStatus,
  };
  // token = generate token using user
  return jwt.sign(payload, "secret");
};

module.exports = { authRegService, authLogService };

const User = require("../db");

const userFindById = (key, id) => {
  return User.findById({ [key]: id });
};

const userFindByEmail = (email) => {
  return User.findOne({ email });
};

const createUser = ({ name, email, password, accountStatus }) => {
  if (accountStatus) {
    const user = new User({ name, email, password, accountStatus });
    return user.save();
  }
  const user = new User({ name, email, password });
  // save object into database
  return user.save();
};

// get all users
const getUsers = () => {
  return User.find();
};

module.exports = {
  userFindById,
  userFindByEmail,
  createUser,
  getUsers,
};

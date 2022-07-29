const userService = require("../services/userService");
const error = require("../utils/error");
// get all users
const getUsersController = async (_req, res, next) => {
  try {
    const users = await userService.getUsers();
    res.status(200).send(users);
  } catch (err) {
    console.log("controller", users);
    next(err);
  }
};

// get user by id
const getUserByIdController = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await userService.userFindById("_id", userId);
    if (!user) {
      throw error(400, "wrong user id");
    }
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

//patch Update User by id
const userUpdateController = async (req, res, next) => {
  const { name, roles, accountStatus } = req.body;
  const { userId } = req.params;
  try {
    const user = await userService.userFindById("_id", userId);
    if (!user) {
      throw error(400, "can not update due to wrong user");
    }
    user.name = name ?? user.name;
    user.roles = roles ?? user.roles;
    user.accountStatus = accountStatus ?? user.accountStatus;
    user.save();
    res.status(203).json({ message: "user updated", user });
  } catch (err) {
    next(err);
  }
};
// delete user by id
const userDeleteController = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await userService.userFindById("_id", userId);
    if (!user) {
      throw error(400, "can not deleted due to wrong user");
    }
    await user.remove();
    res.status(204).send("delete");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUsersController,
  getUserByIdController,
  userUpdateController,
  userDeleteController,
};

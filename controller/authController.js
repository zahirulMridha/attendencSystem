const auth = require("../services/authService");

// start
// name = input()
// email = input()
// password = input()
// if name && email && password is invalid:
// 	return 400 error
// user = find user with email
// if user found:
// 	return 400 error
// hash = hash password
// user = save name, email, hash to user model
// return 201
// End
const registerController = async (req, res, next) => {
  const { name, email, password, accountStatus } = req.body;
  // if name && email && password is invalid:
  if (!name || !email || !password) {
    res.status(400).send("missing something");
  }
  try {
    const user = await auth.authRegService({
      name,
      email,
      password,
      accountStatus,
    });
    res.status(201).json({ message: "user added", user });
  } catch (err) {
    next(err);
  }
};

// start
// login
// email = input()
// password = input()
// user = find user with email
// if user not found:   return 400 error
// if password not equal to user hash: return 400 error
// token = generate token using user
// return token
// end
const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const token = await auth.authLogService(email, password);
    // return token
    res.status(201).send(`"you are login successfully" ${token}`);
  } catch (err) {
    next(err);
  }
};

module.exports = { registerController, loginController };

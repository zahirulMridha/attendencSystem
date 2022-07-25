const express = require("express");
const app = express();
const User = require("./db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

app.use(express.json());
app.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body;
  // if name && email && password is invalid:
  if (!name || !email || !password) {
    res.status(400).send("missing something");
  }
  try {
    // user = find user with email
    let user = await User.findOne({ email });
    if (user) {
      return res.send("user already exist");
    }
    // create model object
    user = new User({ name, email, password });
    // hash = hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    user.password = hash;
    // save object into database
    await user.save();
    res.status(201).send(`"user added" ${user}`);
  } catch (err) {
    next(err);
  }
});

// login
// start
// email = input()
// password = input()
// user = find user with email
// if user not found:   return 400 error
// if password not equal to user hash: return 400 error
// token = generate token using user
// return token
// end
app.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // user = find user with email
    const user = await User.findOne({ email });
    // if user not found:   return 400 error
    if (!user) {
      return res.status(400).send("you have no account");
    }

    // if password not equal to user hash: return 400 error
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(400).send("password is not match");
    }
    // token = generate token using user
    const token = jwt.sign({ name: user.name, email: user.email }, "secret");
    // return token
    res.status(201).send(`"you are login successfully" ${token}`);
  } catch (err) {
    err.message = "custom login error";
    next(err);
  }
});

// public route
app.get("/public", (_req, res) => {
  res.json({ message: "this is public route" });
});
// privet route by token
app.get("/privet", async (req, res, next) => {
  const token = req.headers.authenticate;
  if (!token) {
    return res.json({ message: "empty token " });
  }
  let matchToken;
  try {
    const decode = jwt.verify(token, "secret");
    matchToken = await User.findOne({ email: decode.email });
  } catch (err) {
    if (!matchToken) {
      return res.json({ message: "token is not matching" });
    }
    err.message = "privet custom error ";
    next(err);
  }
  res.json({ message: "this is privet route" });
});
// wrong route
app.use((_req, res) => {
  res.status(400).json({ message: "this route is not exist" });
});
// global middleware
app.use((err, _req, res, _next) => {
  console.log(err);
  res.status(500).json({
    message: "error catch from global middleware ",
    location: err.message,
  });
});

app.listen(4000, () => {
  console.log(" listening server");
});

const express = require("express");
const app = express();
const conncteToDb = require("./db");
const router = require("./routes/index");
const authenticate = require("./middleware/authenticate");

app.use(express.json());
//main index router
app.use(router);

// public route
app.get("/public", (_req, res) => {
  res.json({ message: "this is public route" });
});
// privet route create by token
app.get("/privet", authenticate, async (_req, res, _next) => {
  res.json({ message: "this is privet route" });
});
// wrong route middleware
app.use((_req, res) => {
  res.status(400).json({ message: "this route is not exist" });
});
// global error handler
app.use((err, _req, res, _next) => {
  console.log(err);
  res.status(500).json({
    message: "error catch from global middleware ",
    location: err.message,
  });
});

// server
conncteToDb("mongodb://127.0.0.1:27017/test", {
  serverSelectionTimeoutMS: 1000,
})
  .then(() => {
    console.log("connected to the mongoDb");
    app.listen(4000, () => {
      console.log(" listening server");
    });
  })
  .catch((err) => {
    console.log("there was server connection problem", err);
  });

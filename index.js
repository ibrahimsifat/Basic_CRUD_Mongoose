const express = require("express");
const todoRoutes = require("./handleRoutes/todoRoutes");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./handleRoutes/userRoutes");
const dotenv = require("dotenv");
//middleware
app.use(express.json());
dotenv.config();
//routes
mongoose
  .connect("mongodb://localhost/todos")
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });
//use route
app.use("/todo", todoRoutes);
app.use("/user", userRoutes);
// default error handler
const errorHandler = (err, req, res, next) => {
  if (req.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
};
app.use(errorHandler);
// listing app
app.listen(3000, () => {
  console.log("listing to app 3000");
});

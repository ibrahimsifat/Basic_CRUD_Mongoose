const express = require("express");
const todoRoutes = require("./handleRoutes/todoRoutes");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
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

app.listen(3000, () => {
  console.log("listing to app 3000");
});

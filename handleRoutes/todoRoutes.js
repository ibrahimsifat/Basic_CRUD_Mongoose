const express = require("express");
const router = express.Router();
const todoSchema = require("../schema/todoSchema");
const mongoose = require("mongoose");
const Todo = mongoose.model("todo", todoSchema);

//routes
// get all todos
router.get("/", (req, res) => {
  Todo.find({ status: "active" }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "there was a server side error",
      });
    } else {
      res.status(200).json({
        result: data,
        massage: "todos inserted successfully",
      });
    }
  }).limit(3);
});
//get a todo by id
router.get("/:id", async (req, res) => {
  Todo.findOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "there was a server side error",
      });
    } else {
      res.status(200).json({
        result: data,
        massage: "Success",
      });
    }
  });
});
//post a todo
router.post("/", (req, res) => {
  const newTodo = new Todo(req.body);
  newTodo.save((err) => {
    if (err) {
      res.status(500).json({
        error: "there was a server site error",
      });
    } else {
      res.status(500).json({
        massage: "todo inserted successfully",
      });
    }
  });
});
//post many todos
router.post("/all", async (req, res) => {
  await Todo.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({
        error: "there was a server side error",
      });
    } else {
      res.status(200).json({
        massage: "todos inserted successfully",
      });
    }
  });
});

//put todo by id
router.put("/:id", (req, res) => {
  Todo.updateOne(
    { _id: req.params.id },
    {
      $set: {
        status: "active",
      },
    },
    (err) => {
      if (err) {
        res.status(500).json({
          error: "there was a server side error",
        });
      } else {
        res.status(200).json({
          massage: "todos updated successfully",
        });
      }
    }
  );
});

//delete a todo by id
router.delete("/:id", (req, res) => {
  Todo.deleteOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).json({
        error: "there was a server side error",
      });
    } else {
      res.status(200).json({
        result: data,
        massage: "Deleted",
      });
    }
  });
});
module.exports = router;

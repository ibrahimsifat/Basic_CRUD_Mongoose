const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const userSchema = require("../schema/userSchema");
const mongoose = require("mongoose");
const User = mongoose.model("user", userSchema);
const jwt = require("jsonwebtoken");
//routes
// singup users
router.post("/signup", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({
      massage: "user sign up successfully",
    });
  } catch {
    res.status(500).json({
      massage: "sign up not successful",
    });
  }
});
router.post("/login", async (req, res) => {
  try {
    const user = await User.find({ username: req.body.username });
    if (user && user.length > 0) {
      const isValidPassword = bcrypt.compare(
        req.body.password,
        user[0].password
      );
      if (isValidPassword) {
        // generate token
        const token = jwt.sign(
          {
            username: user[0].username,
            id: user[0]._id,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "2h",
          }
        );
        res.status(200).json({
          access_token: token,
          massage: "login Successful",
        });
      } else {
        res.status(401).json({
          error: "Authentication failed",
        });
      }
    } else {
      res.status(401).json({
        error: "Authentication failed",
      });
    }
  } catch {
    res.status(401).json({
      error: "Authentication failed",
    });
  }
});
module.exports = router;

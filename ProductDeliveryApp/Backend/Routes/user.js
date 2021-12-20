const { User } = require("../Model/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv/config");
const mongoose = require("mongoose");

router.get(`/`, async (req, res) => {
  const userList = await User.find().select("-passwordHash");

  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
});

router.get("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).send("Invalid User Id");
  }
  const user = await User.findById(req.params.id).select("-passwordHash");
  if (!user) {
    return res.status(500).json({
      message: "the category with the given ID was not found",
    });
  } else {
    return res.status(200).send(user);
  }
});

router.post("/", async (req, res) => {
  console.log("hello i am here");
  console.log(req.body);
  const myuser = JSON.parse(req.body);
  let user = new User({
    name: myuser.name,
    email: myuser.email,
    // passwordHash: bcrypt.hashSync(req.body.password, 10),
    passwordHash: myuser.password,
  });
  console.log(user);
  user = await user.save();
  if (!user) {
    return res.status(400).send("the user cannot be created!");
  } else {
    res.send(user);
  }
});

router.post("/login", async (req, res) => {
  console.log(req.body);
  //   const myuser = JSON.parse(req.body);
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.send({
      status: 200,
      login: false,
    });
  } else {
    const password = req.body.password;
    if (password === user.passwordHash) {
      return res.send({
        status: 200,
        login: true,
        user: user,
      });
    } else {
      return res.send({
        status: 200,
        login: false,
      });
    }
  }
});

module.exports = router;

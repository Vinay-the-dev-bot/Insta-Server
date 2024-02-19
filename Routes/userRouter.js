const express = require("express");
const { userModel } = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();
const dotenv = require("dotenv").config();
const { blackListModel } = require("../Models/blackListModel");

userRouter.post("/register", (req, res) => {
  bcrypt.hash(req.body.password, 5, async (err, hash) => {
    if (hash) {
      try {
        const user = await new userModel({ ...req.body, password: hash });
        await user.save();
        res.send(user);
      } catch (error) {
        res.send({ mongoError: `${error}` });
      }
    } else {
      res.send({ BcryptError: `${err}` });
    }
  });
});

userRouter.post("/login", async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (user) {
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (result) {
        jwt.sign(
          { id: user.id },
          process.env.loginSecret,
          { expiresIn: "7d" },
          (err, token) => {
            if (err) {
              res.send({ JWTError: `${err}` });
            } else {
              res.send({ msg: "Logged In", token });
            }
          }
        );
      } else {
        res.send("Wrong Credentials");
      }
    });
  } else {
    res.send({ msg: "User Not Found" });
  }
});

userRouter.post("/logout", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const logout = new blackListModel({ token });
    await logout.save();
    res.send({ msg: "Logged Out" });
  } catch (error) {
    res.send({ lacklistError: `${error}` });
  }
});

module.exports = { userRouter };

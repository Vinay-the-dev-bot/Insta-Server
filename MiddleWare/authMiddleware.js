const jwt = require("jsonwebtoken");
const { userModel } = require("../Models/userModel");
const dotenv = require("dotenv").config();

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  jwt.verify(token, process.env.loginSecret, async (err, decoded) => {
    if (err) {
      res.send({ msg: `${err}` });
    } else {
      const user = await userModel.findOne({ _id: decoded.id });
      if (user) {
        req.body.userId = user._id;
        next();
      } else {
        res.send({ msg: "Please login again" });
      }
    }
  });
};

module.exports = { auth };

const express = require("express");
const { postsModel } = require("../Models/postsModel");
const { auth } = require("../MiddleWare/authMiddleware");
const { isOwner } = require("../MiddleWare/ownerMiddleware");

const postsRouter = express.Router();

postsRouter.post("/add", auth, async (req, res) => {
  try {
    const post = new postsModel({ ...req.body, userID: req.body.userId });
    await post.save();
    res.send(post);
  } catch (error) {
    res.send({ Error: `${error}` });
  }
});

postsRouter.get("/:postId", auth, isOwner, async (req, res) => {
  try {
    const post = await postsModel.findOne({ _id: req.params.postId });
    if (req.body.userId == post.userId) {
      res.send(post);
    } else {
      res.send({ msg: "Not Authorized" });
    }
  } catch (error) {
    res.send({ Error: `${error}` });
  }
});

postsRouter.patch("/:postId", auth, isOwner, async (req, res) => {
  try {
    const post = await postsModel.findByIdAndUpdate(
      { _id: req.params.postId },
      req.body,
      { new: true }
    );
    res.send({ msg: "POST Edited", post });
  } catch (error) {
    res.send({ Error: `${error}` });
  }
});

postsRouter.delete("/:postId", auth, isOwner, async (req, res) => {
  try {
    const post = await postsModel.findByIdAndDelete({ _id: req.params.postId });
    res.send({ msg: "POST Deleted", post });
  } catch (error) {
    res.send({ Error: `${error}` });
  }
});

postsRouter.get("/", auth, async (req, res) => {
  try {
    if (req.query.page) {
      page = parseInt(req.query.page);
      let skip = 3 * page - 3;
      let posts = await postsModel
        .find({
          userId: req.body.userId,
        })
        .skip(skip)
        .limit(3);
      res.send(posts);
    } else {
      let posts = await postsModel.find({
        userId: req.body.userId,
      });

      if (req.query.device) {
        posts = posts.filter((post) => post.device == req.query.device);
      }
      if (parseInt(req.query.min)) {
        posts = posts.filter((post) => post.commentsCount >= req.query.min);
      }
      if (parseInt(req.query.max)) {
        posts = posts.filter((post) => post.commentsCount <= req.query.max);
      }
      res.send(posts);
    }
  } catch (error) {
    res.send({ Error: `${error}` });
  }
});

module.exports = { postsRouter };

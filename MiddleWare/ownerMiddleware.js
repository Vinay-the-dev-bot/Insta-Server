const { postsModel } = require("../Models/postsModel");

const isOwner = async (req, res, next) => {
  const post = await postsModel.find({ _id: req.params.postId });
  if ((post.userId = req.body.userId)) {
    next();
  } else {
    res.send({ msg: "Not Authorized" });
  }
};

module.exports = { isOwner };

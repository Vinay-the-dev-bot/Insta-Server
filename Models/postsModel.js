const mongoose = require("mongoose");
const postsSchema = mongoose.Schema(
  {
    quote: { type: String, required: true },
    photo: { type: String, required: true },
    device: { type: String, required: true },
    commentsCount: { type: Number, required: true },
    userId: { type: String, required: true },
  },
  { versionKey: false }
);

const postsModel = mongoose.model("instaPosts", postsSchema);
module.exports = { postsModel };
// {
//     "quote": "GOOD DAY",
//     "photo": "/Photos",
//     "device": "Samsung",
//     "commentsCount": 5,
// }

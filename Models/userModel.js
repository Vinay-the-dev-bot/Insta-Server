const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    city: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
  },
  { versionKey: false }
);

const userModel = mongoose.model("instaUsers", userSchema);
module.exports = { userModel };

//   {
//     "username": "VINAY",
//     "email": "VINAY@234.com",
//     "password": "123456",
//     "city": "Bnnglt",
//     "age": 25,
//     "gender": "MALE"
//   }

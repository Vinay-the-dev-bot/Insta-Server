const mongoose = require("mongoose");
const blackListSchema = mongoose.Schema(
  {
    token: String,
  },
  { versionKey: false }
);

const blackListModel = mongoose.model("blacklisted", blackListSchema);
module.exports = { blackListModel };

//   {
//     "username": "VINAY",
//     "email": "VINAY@234.com",
//     "password": "123456",
//     "city": "Bnnglt",
//     "age": 25,
//     "gender": "MALE"
//   }

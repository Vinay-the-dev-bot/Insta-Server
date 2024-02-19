const express = require("express");
const { connection } = require("./Config/db");
const { userRouter } = require("./Routes/userRouter");
const { postsRouter } = require("./Routes/postsRouter");
const app = express();
const dotenv = require("dotenv").config();

app.use(express.json());

app.use("/users", userRouter);
app.use("/posts", postsRouter);

app.get("/", (req, res) => {
  res.send("HOME PAGE");
});

app.listen(4500, async () => {
  await connection;
  console.log("Connected to DB");
  console.log(`listening at ${process.env.PORT}`);
});

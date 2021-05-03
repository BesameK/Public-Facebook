const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const postsRouter = require("./routes/PostsRouter");
const usersRouter = require("./routes/UsersRouter");

dotenv.config({
  path: "./config.env",
});

const app = express();

const loggingMiddlware = (req, res, next) => {
  console.log("URL ", req.url, req.body);
  next();
};

app.use(express.json());
app.use(loggingMiddlware);
app.use("/api/v1/posts", postsRouter);

app.use("/api/v1/users", usersRouter);

const connectionPassword = process.env.DATABASE_PASSWORD;
const connectionURL = process.env.DATABASE_URL.replace(
  "<password>",
  connectionPassword
);

mongoose
  .connect(connectionURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((conn) => {
    console.log("Connection established ");
  })
  .catch((err) => {
    console.log("Could not connect", err);
  });

app.listen(process.env.PORT, () => {
  console.log("Server is running");
});

const express = require("express");

const usersRouter = express.Router();
const {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
} = require("../controllers/UsersController");

usersRouter.route("/").post(createUser).get(getUsers);

usersRouter.route("/UserId/:UserId").patch(updateUser).delete(deleteUser);

module.exports = usersRouter;

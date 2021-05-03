const express = require("express");

const postsRouter = express.Router();
const {
  createPost,
  updatePost,
  deletePost,
  getPosts,
  topFivePosts,
} = require("../controllers/PostsController");

postsRouter.route("/").post(createPost).get(getPosts);
postsRouter.route("/topFivePosts").get(topFivePosts, getPosts);
postsRouter.route("/postId/:postId").patch(updatePost).delete(deletePost);

module.exports = postsRouter;

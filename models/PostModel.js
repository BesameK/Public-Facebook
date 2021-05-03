const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  image: String,
  comments: [
    {
      author: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    },
  ],
  rating: {
    type: Number,
    default: 0,
  },
  creationDate: {
    type: Date,
    default: new Date(),
  },
  emotion: String,

  category: {
    type: String,
    required: true,
  },
});

const Post = mongoose.model("Post", postsSchema);
module.exports = Post;

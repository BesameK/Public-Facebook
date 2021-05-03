const Post = require("../models/PostModel");

exports.topFivePosts = (req, res, next) => {
  req.query = {
    sortBy: "-rating",
    limit: 5,
  };
  next();
};
exports.getPosts = async (req, res) => {
  try {
    const postQuery = {
      ...req.query,
    };
    if (req.query.rating) {
      let tempStrRating = JSON.stringify(req.query.rating);
      tempStrRating = tempStrRating.replace("gt", "$gt");
      tempStrRating = tempStrRating.replace("lt", "$lt");
      tempStrRating = JSON.parse(tempStrRating);

      postQuery.rating = tempStrRating;
    }

    const unusedParams = [
      "text",
      " image",
      "comments",
      "sortBy",
      "limit",
      "page",
    ];
    unusedParams.forEach((element) => {
      delete postQuery[element];
    });

    const foundByQuery = Post.find(postQuery);
    if (req.query.sortBy) {
      foundByQuery.sort(req.query.sortBy);
    }

    const page = Number(req.query.page) - 1;
    let limit = 10;
    if (req.query.limit) {
      limit = Math.min(Number(req.query.limit), 100);
    }
    foundByQuery.skip(limit * page).limit(limit);

    const foundPosts = await foundByQuery;
    res.json({
      status: "success",
      data: { foundPosts },
    });
  } catch (err) {
    res.json({
      status: "error",
      message: err.message,
    });
  }
};

exports.createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);
    await newPost.save(req.body);
    res.json({
      status: "success",
      data: newPost,
    });
  } catch (err) {
    res.json({
      status: "error",
      message: err.message,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findOneAndDelete({ _id: req.params.postId });
    res.json({
      status: "success",
      data: {
        deletedPost,
      },
    });
  } catch (err) {
    res.json({
      status: "error",
      message: err.message,
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const upadetedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        ...req.body,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.json({
      status: "success",
      data: upadetedPost,
    });
  } catch (err) {
    res.json({
      status: "error",
      message: err.message,
    });
  }
};

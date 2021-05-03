const User = require("../models/UserModel");

exports.getUsers = async (req, res) => {
  try {
    const foundUsers = await User.find();
    res.json({
      status: "success",
      data: { foundUsers },
    });
  } catch (err) {
    res.json({
      status: "error",
      message: err.message,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save(req.body);
    res.json({
      status: "success",
      data: newUser,
    });
  } catch (err) {
    res.json({
      status: "error",
      message: err.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ _id: req.params.UserId });
    res.json({
      status: "success",
      data: {
        deletedUser,
      },
    });
  } catch (err) {
    res.json({
      status: "error",
      message: err.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const upadetedUser = await User.findByIdAndUpdate(
      req.params.UserId,
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
      data: upadetedUser,
    });
  } catch (err) {
    res.json({
      status: "error",
      message: err.message,
    });
  }
};

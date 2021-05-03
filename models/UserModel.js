const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
    maxLength: 30,
    minLength: 4,
  },
  Surname: {
    type: String,
    maxLength: 40,
    minLength: 4,
    required: true,
  },
  Age: {
    type: Number,
    min: 0,
    max: 120,
  },
  Gender: {
    type: String,
    default: "Male",
    enum: ["Female", "Male", "Other"],
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;

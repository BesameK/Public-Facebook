const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Post = require("../models/PostModel");
const User = require("../models/UserModel");

dotenv.config({
  path: "../config.env",
});

const posts = [
  {
    title: "Importance of blogging",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis quis dui vehicula aliquet.",
    author: "60899555c56c5b13ecfb299f",
    image: "",
    comments: [
      { author: "nika dumbadze", text: "have a nice day" },
      { author: "tornike", text: "my boy" },
      { author: "tedo maxaradze", text: "wow good job" },
    ],
    rating: 5,
    creation_date: new Date(),
    category: "Blogging",
    emotion: "PumpedUp",
  },
  {
    title: "Meore blogi",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis quis dui vehicula aliquet.",
    author: "60899555c56c5b13ecfb299f",
    image: "",
    comments: [],
    rating: 4.3,
    creation_date: new Date(),
    category: "Travel",
    emotion: "Depressed",
  },
  {
    title: "Mesame blogi",
    text:
      "onec in orci mattis, congue massa sed, pretium sem. Nam leo enim, sagittis et egestas eu, malesuada eget arcu. Aliquam ipsum turpis, egestas at tortor vel, porta elementum ipsum. ",
    author: "60899555c56c5b13ecfb299f",
    image: "",
    comments: [],
    rating: 2.2,
    creation_date: new Date(),
    category: "Food",
    emotion: "Upbeat",
  },
  {
    title: "Lorem ipsum",
    text:
      " Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed et dignissim dolor, quis rhoncus eros. Quisque eu pulvinar odio. In non nunc pharetra, finibus erat commodo, iaculis sem. Morbi auctor tristique eros quis volutpat. Praesent lacinia diam sit amet porta elementum. Quisque libero nulla, feugiat ut vehicula et, maximus ac metus. Donec mollis at dolor sed fermentum. ",
    author: "60899555c56c5b13ecfb29a0",
    image: "https://www.lipsum.com/feed/html",
    comments: [],
    rating: 3.4,
    creation_date: new Date(),
    category: "Food",
    emotion: "Upbeat",
  },
  {
    title: "Benefits of traveling alone",
    text: "You can be completely selfish",
    author: "60899555c56c5b13ecfb29a0",
    image: "https://www.lipsum.com/feed/html",
    comments: [
      { author: "nika dumbadze", text: "have a nice day" },
      { author: "tornike", text: "my boy" },
      { author: "tedo maxaradze", text: "wow good job" },
    ],
    rating: 1.4,
    creation_date: new Date(),
    category: "Travel",
    emotion: "Sad",
  },
  {
    title: "Benefits of traveling in group",
    text:
      "is rhoncus eros. Quisque eu pulvinar odio. In non nunc pharetra, finibus erat commodo, iaculis sem. Morbi auctor tristique eros quis volutpat. Praesent lacinia diam sit amet porta elementum. Quisque libero nulla, feugiat ut vehicula et, maximus ac metus. Donec mollis at dolor sed fermentum. ",
    author: "60899555c56c5b13ecfb29a0",
    image:
      "https://www.google.com/search?client=firefox-b-d&q=Benefits+of+traveling+alone",
    comments: [
      { author: "nika dumbadze", text: "have a nice day" },
      { author: "tornike", text: "my boy" },
      { author: "tedo maxaradze", text: "wow good job" },
    ],
    rating: 2.99,
    creation_date: new Date(),
    category: "Travel",
    emotion: "Upbeat",
  },
];

// const posts = [
//   {
//     title: "Importance of blogging",
//     text:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis quis dui vehicula aliquet.",
//     author: "Giorgi Andriadze",
//     image: "",
//     comments: [
//       { author: "nika dumbadze", text: "have a nice day" },
//       { author: "tornike", text: "my boy" },
//       { author: "tedo maxaradze", text: "wow good job" },
//     ],
//     rating: 10,
//     creationDate: new Date(),
//     category: "Blogging",
//     emotion: "PumpedUp",
//   },
//   {
//     title: "Importance of blogging",
//     text:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis quis dui vehicula aliquet.",
//     author: "Giorgi Andriadze",
//     image: "",
//     comments: [],
//     rating: 10,
//     creationDate: new Date(),
//     category: "Blogging",
//     emotion: "PumpedUp",
//   },
// ];
const users = [
  {
    Name: "giorga",
    Surname: "Andriadze",
    Age: 23,
    Gender: "Male",
    Email: "giorgi@gmail.com",
  },
  {
    Name: "nino",
    Surname: "Lomidze",
    Age: 31,
    Gender: "Female",
    Email: "nino@gmail.com",
  },
];

const connectionPassword = process.env.DATABASE_PASSWORD;
const connectionURL = process.env.DATABASE_URL.replace(
  "<password>",
  connectionPassword
);

const importPosts = async () => {
  try {
    const result = await Post.create(posts);
    // const userResult = await User.create(users);

    console.log("Result", result);
  } catch (err) {
    console.log("Error creating db", err.message);
  }
};

const importUsers = async () => {
  try {
    const userResult = await User.create(users);

    console.log("Result", userResult);
  } catch (err) {
    console.log("Error creating db", err.message);
  }
};

const deleteAll = async () => {
  try {
    await Post.deleteMany({});
    // await User.deleteMany({});
  } catch (err) {
    console.log(err);
  }
};

mongoose
  .connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(async (conn) => {
    importPosts();
    // First import users
    // Then import posts
  })
  .catch((err) => {
    console.log("Could not connect", err);
  });

module.exports = posts;

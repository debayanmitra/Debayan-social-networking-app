const { NgModel } = require("@angular/forms");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Post = require("./model/post");
const path = require('path');
const mongoose = require("mongoose");
const postRoutes = require('./routes/posts');

mongoose
  .connect(
    "mongodb://localhost:27017/node-angular?retryWrites=true",
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected DB");
  })
  .catch(() => {
    console.log("Error Connecting DB");
  });

app.use(bodyParser.json());
app.use("/images", express.static(path.join("backend/images")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, x-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use('/api/posts', postRoutes);
// app.post("/api/posts", (req, res, next) => {
//   //code accept post request
//   const post = new Post({
//     title: req.body.title,
//     content: req.body.content,
//   });
//   console.log(post);
//   post
//     .save()
//     .then((res) => {
//       console.log("Success = " + res.status);
//     })
//     .catch((errr) => {
//       console.log("errr = " + errr.message);
//     });

//   res.status(201).json({
//     message: "Post added successfully",
//   });
//   next();
// });

// app.use("/api/posts", (req, res, next) => {
//   //send some data back

//   const posts = [
//     {
//       id: "postid1",
//       title: "First server-side post",
//       content: "This is coming from the server!",
//     },
//     {
//       id: "postid2",
//       title: "Second server-side post",
//       content: "This is coming from the server as well!",
//     },
//   ];

//   res.status(200).json({
//     message: "data fethced successfully",
//     posts: posts,
//   });
// });

module.exports = app;

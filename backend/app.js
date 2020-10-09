const { NgModel } = require("@angular/forms");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const post = require("./model/post");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false"
  )
  .then(() => {
    console.log("connected DB");
  })
  .catch(() => {
    console.log("Error Connecting DB");
  });

app.use(bodyParser.json());

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

app.post("/api/posts", (req, res, next) => {
  //code accept post request
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  console.log(post);
  post.save();

  res.status(201).json({
    message: "Post added successfully",
  });
  next();
});

app.use("/api/posts", (req, res, next) => {
  //send some data back

  const posts = [
    {
      id: "postid1",
      title: "First server-side post",
      content: "This is coming from the server!",
    },
    {
      id: "postid2",
      title: "Second server-side post",
      content: "This is coming from the server as well!",
    },
  ];

  res.status(200).json({
    message: "data fethced successfully",
    posts: posts,
  });
});

module.exports = app;

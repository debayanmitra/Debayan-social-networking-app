const { NgModel } = require("@angular/forms");
const express = require("express");
const app = express();

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

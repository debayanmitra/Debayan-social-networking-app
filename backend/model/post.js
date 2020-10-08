const mongoose = require("mongoose");
const { stringify } = require("querystring");

const postSchema = mongoose.Schema({
  title: { type: string, required: true },
  content: { type: string, required: true },
});

module.exports = mongoose.model("Posts", postSchema);

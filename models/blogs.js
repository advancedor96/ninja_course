const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: String,
  content: String,
  author: String,
  createdAt: { type: Date, default: Date.now },
})

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;




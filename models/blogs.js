const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: String,
  content: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
})


const userSchema = new Schema({
  username: String,
  password: String,
  blogs: [{ type: Schema.Types.ObjectId, ref: 'Blog' }]
});


const Blog = mongoose.model('Blog', blogSchema);
const User = mongoose.model('User', userSchema);

module.exports = {Blog, User};

const Blog = require('../models/blogs.js');


// 實現 CRUD 操作，例如新增、查詢、更新、刪除
const blogController = {
  getAllBlogs: async (req, res)=>{
    try {
      const blogs = await Blog.find();
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ error: '找不到all blogs', details: error.message });
    }
  },

  getBlogById: async (req, res) => {
    try {
      const { id } = req.params;
      const blog = await Blog.findById(id);
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      res.status(200).json(blog);
    } catch (error) {
      res.status(500).json({ error: '找不到特定的 blog', details: error.message });
    }
  },
  createBlog: async (req, res) => {
    try {
      const { title, content, author } = req.body;
      const newBlog = new Blog({ title, content, author });
      await newBlog.save();
      res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
    } catch (error) {
      res.status(500).json({ error: 'Error creating blog', details: error.message });
    }
  },
  updateBlog: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content, author } = req.body;
      const updatedBlog = await Blog.findByIdAndUpdate(id, { title, content, author }, { new: true });
      if (!updatedBlog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      res.status(200).json({ message: 'Blog updated successfully', blog: updatedBlog });
    } catch (error) {
      res.status(500).json({ error: 'Error updating blog', details: error.message });
    }
  },
  deleteBlog: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedBlog = await Blog.findByIdAndDelete(id);
      if (!deletedBlog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      res.status(200).json({ message: 'Blog deleted successfully', blog: deletedBlog });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting blog', details: error.message });
    }
  },

}

module.exports = blogController;

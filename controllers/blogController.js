const {Blog, User} = require('../models/blogs.js');


// 實現 CRUD 操作，例如新增、查詢、更新、刪除
const blogController = {
  getAllBlogs: async (req, res)=>{
    try {
      // claude 給我這一行：
      
      // const user = await User.findById(req.session.user._id).populate('blogs');
      const user = await User.findById(req.userId).populate('blogs');
      const blogs = user.blogs;

      // const blogs = await Blog.find();
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
      const { title, content } = req.body;
      const userId = req.session.user._id; // 從會話中獲取用戶 ID

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: '沒有這個user' });
      }

      const newBlog = new Blog({ title, content, author: user._id });
      await newBlog.save();

      // 將新博客添加到用戶的博客列表中
      user.blogs.push(newBlog._id);
      await user.save();


      res.status(201).json({ message: '建立blog成功，更新user blog成功', blog: newBlog });
    } catch (error) {
      res.status(500).json({ error: 'Error creating blog', details: error.message });
    }
  },
  updateBlog: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      const userId = req.session.user._id;

      // 查找博客
      const blog = await Blog.findById(id);
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }

      // 驗證作者身份
      if (blog.author.toString() !== userId) {
        return res.status(403).json({ message: 'You are not authorized to update this blog' });
      }

      // 更新博客
      blog.title = title;
      blog.content = content;
      const updatedBlog = await blog.save();

      res.status(200).json({ message: 'Blog updated successfully', blog: updatedBlog });
    } catch (error) {
      res.status(500).json({ error: 'Error updating blog', details: error.message });
    }
  },
  deleteBlog: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.session.user._id;

      // 查找博客
      const blog = await Blog.findById(id);
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }

      // 驗證作者身份
      if (blog.author.toString() !== userId) {
        return res.status(403).json({ message: 'You are not authorized to delete this blog' });
      }

      // 從用戶的博客列表中移除被刪除的博客
      const user = await User.findById(userId);
      user.blogs = user.blogs.filter((blogId) => blogId.toString() !== id);
      await user.save();

      // 刪除博客
      const deletedBlog = await Blog.findByIdAndDelete(id);

      res.status(200).json({ message: 'Blog deleted successfully', blog: deletedBlog });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting blog', details: error.message });
    }
  },

}

module.exports = blogController;

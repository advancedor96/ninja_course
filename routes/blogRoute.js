// routes/blogRoutes.js
const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// 定義路由
router.get('/blogs', authMiddleware.jwtVerifyToken, blogController.getAllBlogs);
router.get('/blogs/:id', blogController.getBlogById);
router.post('/blogs', authMiddleware.authenticateUser, blogController.createBlog);
router.put('/blogs/:id', authMiddleware.authenticateUser, blogController.updateBlog);
router.delete('/blogs/:id', authMiddleware.authenticateUser, blogController.deleteBlog);

// 註冊路由
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/logout', authController.logoutUser);

module.exports = router;

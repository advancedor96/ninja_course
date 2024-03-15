const {Blog, User} = require('../models/blogs.js');
const bcrypt = require('bcrypt');

// 待加
// const bcrypt = require('../utils/bcryptUtils');

const authController = {
  registerUser: async (req, res)=>{
    const { username, password } = req.body;

    try {
      // 检查用户名是否已被使用
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: `${username}使用者已存在` });
      }
  
      // 加密密码
      const salt = 10;
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // 创建新用户
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: `User ${username} 成功註冊` });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '註冊發生錯誤...' });
    }
  },
  loginUser: async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // 查找用戶
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: `${username}登入失敗。` });
      }
  
      // 驗證密碼
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: '登入失敗，密碼錯誤' });
      }
  
      // 將用戶資訊存儲在會話中
      req.session.user = { userId: user._id };
      console.log('user在 express裡:', req.session);
      
  
      res.json({ message: `${username}登入成功` });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '登入錯誤' });
    }
  },
  logoutUser: async (req, res) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Server error' });
        }
        // 清除 cookie
        res.clearCookie('connect.sid');
  
        res.status(200).json({ message: 'Logout successful' });
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
}
module.exports = authController;
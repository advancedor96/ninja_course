const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtKey = process.env.JWT_KEY;
console.log('取得jwt key:',jwtKey);


exports.authenticateUser = (req, res, next) => {
  console.log('中途的session id:',req.sessionID);
  
  console.log('中途檢查session:', req.session);
  
  if (!req.session.user) {
    console.log('認證失敗，沒有發現 session... ');
    
    return res.status(401).json({ message: '沒有發現 session... 認證失敗' });
  }
  console.log('認證成功，有session');
  

  next();
};

exports.jwtVerifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log('中途檢查jwt:', token);
  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'jwt驗證失敗' });
      }
      req.userId = decoded.userId;
      next();
    });
  } else {
    res.status(403).json({ message: 'No token provided' });
  }
}
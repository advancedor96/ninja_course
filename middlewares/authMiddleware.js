exports.authenticateUser = (req, res, next) => {
  console.log('中途檢查session:', req.session);
  
  if (!req.session.user) {
    console.log('認證失敗，沒有發現 session... ');
    
    return res.status(401).json({ message: '沒有發現 session... 認證失敗' });
  }
  console.log('認證成功，有session');
  

  next();
};
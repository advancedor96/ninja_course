exports.authenticateUser = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  next();
};
const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      message: 'Access Denied'
    });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verified.userId;
    next();
  } catch (error) {
    res.status(400).json({
      message: 'Invalid Token'
    });
  }
};

module.exports = verifyUser;
const jwt = require('jsonwebtoken');
const { getUser } = require('../jwt/jwt')

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = getUser(token);
    req.user = decoded; // Attaches user payload (including id) to the request
    next();
  } catch (error) {
    console.log("Error", error)
    res.status(403).json({ success: false, message: 'Invalid or expired token.' });
  }
};

module.exports = verifyToken;
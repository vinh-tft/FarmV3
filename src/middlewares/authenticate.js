const { verifyToken } = require('../utils/jwt');

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token không hợp lệ' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
  }
}

module.exports = authenticate;
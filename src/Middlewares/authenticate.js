const { verifyToken } = require('../Utils/jwt');
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.status(401).json({ message: 'Token không hợp lệ' });
  try {
    req.user = verifyToken(authHeader.split(' ')[1]);
    next();
  } catch {
    res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
  }
}
module.exports = authenticate;
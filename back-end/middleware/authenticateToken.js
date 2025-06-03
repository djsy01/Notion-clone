const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer token"에서 token만 분리

  if (!token) return res.status(401).json({ message: '토큰이 없습니다.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: '토큰이 유효하지 않습니다.' });

    req.user = user; // 토큰 해석된 사용자 정보 저장
    next();
  });
}

module.exports = authenticateToken;

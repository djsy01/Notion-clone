const { pool } = require('../db/db');

async function profileHandler(req, res) {
  try {
    const userId = req.user.id;  // authenticateToken 미들웨어에서 넣어준 사용자 ID
    const [rows] = await pool.query(
      'SELECT id, username, email, nickname FROM users WHERE id = ?',
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    res.json(rows[0]);  // 사용자 정보 반환
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류' });
  }
}

module.exports = profileHandler;

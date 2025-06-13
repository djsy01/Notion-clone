const bcrypt = require('bcrypt');
const { pool } = require('../db/db');

module.exports = async (req, res) => {
  const { username, email, nickname, password } = req.body;

  if (!username || !email || !nickname || !password) {
    return res.status(400).json({ message: '모든 필드를 입력해주세요.' });
  }

  try {
    // 중복 사용자 검사
    const [existingUsers] = await pool.query(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [username, email]
    );
    if (existingUsers.length > 0) {
      return res.status(409).json({ message: '이미 존재하는 사용자입니다.' });
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 추가
    const [result] = await pool.query(
      'INSERT INTO users (username, email, nickname, password) VALUES (?, ?, ?, ?)',
      [username, email, nickname, hashedPassword]
    );

    res.status(201).json({ message: '회원가입 성공', userId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류' });
  }
};

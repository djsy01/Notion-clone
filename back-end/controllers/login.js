const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../db/db');

module.exports = async (req, res) => {
  const { username, password } = req.body;

  console.log('🔑 로그인 시도:', username, password);

  try {
    // 1) 사용자 조회
    const [users] = await pool.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    if (users.length === 0) {
      console.log('❌ 사용자 없음');
      return res.status(401).json({ message: '아이디 또는 비밀번호가 잘못되었습니다.' });
    }

    const user = users[0];
    console.log('✅ 사용자 찾음:', user);

    // 2) 비밀번호 비교
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    console.log('🔍 비밀번호 비교 결과:', isPasswordMatch);

    if (!isPasswordMatch) {
      console.log('❌ 비밀번호 불일치');
      return res.status(401).json({ message: '아이디 또는 비밀번호가 잘못되었습니다.' });
    }

    // 3) JWT 토큰 생성 (id만 포함)
    const token = jwt.sign(
      { id: user.id }, // ✅ 오직 id만 포함
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    console.log('🔐 토큰 생성 완료');

    // 4) 로그인 성공 응답
    res.status(200).json({ message: '로그인 성공', token });
  } catch (err) {
    console.error('🔥 서버 오류:', err);
    res.status(500).json({ message: '서버 오류' });
  }
};

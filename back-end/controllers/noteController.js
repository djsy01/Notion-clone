// controllers/noteController.js
const pool = require('../db/db');

exports.createNote = async (req, res) => {
  const userId = req.user.userId; // authenticateToken이 넣어준 user 정보
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: '제목과 내용을 입력하세요.' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)',
      [userId, title, content]
    );

    res.status(201).json({ message: '노트 생성 성공', noteId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류' });
  }
};

exports.getUserProfile = async (req, res) => {
  const userId = req.user.userId;

  try {
    const [users] = await pool.query(
      'SELECT id, username FROM users WHERE id = ?',
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    res.status(200).json(users[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류' });
  }
};

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/users.json');

module.exports = (req, res) => {
  const { username, password } = req.body;

  const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: '아이디 또는 비밀번호가 잘못되었습니다.' });
  }

  res.status(200).json({ message: '로그인 성공', userId: user.id });
};

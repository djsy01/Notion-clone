const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const filePath = path.join(__dirname, '../data/users.json');

module.exports = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: '아이디와 비밀번호를 입력해주세요.' });
  }

  const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(409).json({ message: '이미 존재하는 사용자입니다.' });
  }

  const newUser = {
    id: uuidv4(),
    username,
    password // 나중엔 bcrypt 해싱 필요
  };

  users.push(newUser);
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');

  res.status(201).json({ message: '회원가입 성공', userId: newUser.id });
};

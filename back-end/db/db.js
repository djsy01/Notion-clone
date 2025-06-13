// db.js 예시 (Node.js mysql2)
require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function getUserById(id) {
  const [rows] = await pool.query('SELECT id, username, nickname, email FROM users WHERE id = ?', [id]);
  return rows[0]; // 없으면 undefined
}

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('MySQL 연결 성공!');
    connection.release();
  } catch (err) {
    console.error('MySQL 연결 실패:', err);
  }
}

testConnection();
module.exports = {
  pool,
  getUserById,
};

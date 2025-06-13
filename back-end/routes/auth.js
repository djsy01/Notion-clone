// routes/auth.js
const express = require('express');
const router = express.Router();
const registerHandler = require('../controllers/register');
const loginHandler = require('../controllers/login');
const profileHandler = require('../controllers/profile');
const authenticateToken = require('../middleware/authenticateToken');

const meRoute = require('./me'); // ✅ 추가

// POST /auth/register
router.post('/register', registerHandler);

// POST /auth/login
router.post('/login', loginHandler);

// GET /auth/profile (optional)
router.get('/profile', authenticateToken, profileHandler);

// ✅ GET /auth/me 경로에서 me.js 사용
router.use('/me', meRoute); // ✔ /auth/me 요청 시, me.js 내부의 '/' 라우트로 연결됨

module.exports = router;

const express = require('express');
const router = express.Router();

// 각각의 기능 모듈로 분리
const registerHandler = require('./register');
const loginHandler = require('./login');

// POST /auth/register
router.post('/register', registerHandler);

// POST /auth/login
router.post('/login', loginHandler);

module.exports = router;

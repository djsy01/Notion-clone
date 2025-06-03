const express = require('express');
const router = express.Router();

const authenticateToken = require('../middleware/authenticateToken');
const { createNote, getUserProfile } = require('../controllers/noteController');

// 로그인한 사용자만 노트 생성 가능
router.post('/notes', authenticateToken, createNote);

// 로그인한 사용자만 내 프로필 조회 가능
router.get('/profile', authenticateToken, getUserProfile);

module.exports = router;

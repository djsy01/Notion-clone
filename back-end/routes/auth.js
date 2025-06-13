const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');

const registerHandler = require('../controllers/register');
const loginHandler = require('../controllers/login');
const profileHandler = require('../controllers/profile');

// POST /auth/register
router.post('/register', registerHandler);

// POST /auth/login
router.post('/login', loginHandler);

// GET /auth/profile (인증 필요)
router.get('/profile', authenticateToken, profileHandler);

module.exports = router;

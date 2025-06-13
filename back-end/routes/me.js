const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const db = require("../db/db"); // db.getUserById 함수가 정의되어 있어야 함

// GET /auth/me
router.get("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("요청된 사용자 ID:", userId);

    const user = await db.getUserById(userId);
    console.log("조회된 사용자:", user);

    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    res.json({
      id: user.username,
      nickname: user.nickname,
      email: user.email,
    });
  } catch (err) {
    console.error("❌ /auth/me 에러:", err);
    res.status(500).json({ message: "사용자 정보를 불러오지 못했습니다." });
  }
});

module.exports = router;

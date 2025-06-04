const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');  // auth 라우터 import
const noteRoutes = require('./routes/notes');  // notes 라우터 import

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

// /auth 경로로 authRoutes 라우터 연결
app.use('/auth', authRoutes);

// /api 경로로 noteRoutes 라우터 연결
app.use('/api', noteRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

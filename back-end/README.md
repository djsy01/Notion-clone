# 노션 클론 - 백엔드

Express를 기반으로 한 노션 클론 백엔드 서버의 초기 구조를 설정했습니다.  
기본적인 라우팅 설계와 CORS 처리, JWT 인증 기능, 노트 API 구현 및 서버 실행을 중심으로 구성되어 있습니다.

---

## 🔧 사용 기술

- Node.js@20.17.0
- Express@5.1.0
- MySQL@9.3.0 (mysql2 라이브러리 사용)
- JWT (jsonwebtoken 라이브러리 사용)

---

## 📦 사용 라이브러리

- express@5.1.0
- cors@2.8.5
- nodemon (개발용)
- bcrypt@6.0.0
- dotenv@16.5.0
- jsonwebtoken@9.0.2
- mysql2@3.14.2
- uuid@11.1.0

---

## 🔑 구현된 기능

- 회원가입 API (`/auth/register`) : bcrypt로 비밀번호 해싱 후 MySQL에 저장  
- 로그인 API (`/auth/login`) : bcrypt로 비밀번호 검증 후 JWT 토큰 발급  
- JWT 인증 미들웨어 구현 : 요청 헤더 토큰 검증 및 사용자 정보 추출  
- 노트 생성 API (`/notes`) : 로그인한 사용자만 노트 생성 가능  
- 사용자 프로필 조회 API (`/profile`) : 로그인한 사용자 프로필 조회 가능  
- CORS 설정 및 서버 기본 구조 세팅 완료

---

## ⚙️ 기술 포인트

- Express Router를 활용해 기능별 라우터 분리 (`auth`, `note`)  
- JWT 토큰 기반 인증 처리로 보안 강화  
- `dotenv`로 환경변수 관리 (DB 연결 정보, JWT 비밀키 등)  
- MySQL 연결 및 쿼리 풀(pool)로 효율적인 DB 처리  
- 비밀번호 해싱(bcrypt)으로 사용자 보안 확보  
- 미들웨어로 인증 로직 분리하여 재사용성 및 유지보수성 향상

---

## 😓 어려웠던 점 및 해결 방법

- **라우터 분리**: 기능별로 코드 구조를 나누는 과정에서 디렉토리 구조 고민 → `/routes` 디렉토리로 분리하여 해결
- **CORS 오류**: 클라이언트 요청 차단 이슈 발생 → `cors` 라이브러리로 전역 허용 설정 추가

---

📅 날짜별 개발 현황
- 2025.06.03
    - 회원가입, 로그인 기능 구현 및 JWT 토큰 발급
    - 인증 미들웨어(authenticateToken) 구현 및 적용
    - 노트 생성 및 사용자 프로필 조회 API 추가
    - 라우터(auth, note) 분리 및 index.js에 연결
    - MySQL 데이터베이스 연결 및 쿼리 작성 완료
- 2025.05.30 
    - 백엔드 초기 구조 세팅
    - Express 서버 생성 및 실행 확인
    - /workspaces, /pages 라우터 생성
    - CORS 설정 적용
    
---

## 🚀 서버 실행 방법

```bash
cd back-end
npm install
npm start
```

## 🛠️ MySQL 데이터베이스 설정
```sql
CREATE DATABASE IF NOT EXISTS notion_clone;

USE notion_clone;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

## 📁 환경 변수 (.env) 설정
```ini
# 서버 포트 (express)
PORT=4000

# MySQL 설정
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=notion_clone

# JWT 시크릿 키
JWT_SECRET=your_jwt_secret
```
# Task Manager App

A simple full‑stack **Task Manager** with JWT authentication and CRUD APIs using **Node.js, Express, MongoDB**, and a minimal **HTML/CSS/JS** frontend.

## Features
- User signup & login (JWT based)
- Create, read, update, delete tasks
- Filter tasks by completion status
- Simple frontend using Fetch API (no frameworks)
- Clean, minimal code structure

## Tech Stack
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, bcrypt
- **Frontend:** HTML, CSS, JavaScript (Fetch API)
- **Other:** dotenv, CORS, morgan

## Quick Start

### 1) Backend Setup
```bash
cd backend
cp .env.example .env   # then edit .env
npm install
npm run dev            # or: npm start
```
The server runs on `http://localhost:5000` by default.

### 2) Frontend
Simply open `frontend/index.html` in your browser, or serve it with a simple HTTP server:
```bash
# from the project root
python3 -m http.server 5500
# then open http://localhost:5500/frontend/index.html
```

### Environment Variables
Create a `.env` in `backend/`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/task_manager_app
JWT_SECRET=changeme_super_secret_key
CORS_ORIGIN=http://localhost:5500
```
- **PORT**: API server port
- **MONGODB_URI**: your MongoDB connection string
- **JWT_SECRET**: any long random string
- **CORS_ORIGIN**: the origin allowed to call the API (frontend URL)

### API Overview
- `POST /api/auth/signup` → create user ({ name, email, password })
- `POST /api/auth/login` → get token ({ email, password })
- `GET /api/tasks` → list tasks (auth required; supports `?completed=true/false`)
- `POST /api/tasks` → create ({ title, description? })
- `PUT /api/tasks/:id` → update ({ title?, description?, completed? })
- `DELETE /api/tasks/:id` → delete

All `/api/tasks` routes require **Authorization: Bearer <token>**.

### Scripts
- `npm run dev` → start with nodemon
- `npm start` → start with node

### License
MIT

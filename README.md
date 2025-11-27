Task Manager (Full-stack)

This project contains a backend (Node.js + Express + MongoDB Atlas) and a simple frontend (HTML/CSS/JS) to manage tasks with user authentication (JWT).

**✨ Deployment Ready**: Backend deploys to Vercel, Frontend to Vercel/Netlify/GitHub Pages

Backend folder: `backend`
Frontend folder: `frontend`

## Prerequisites
- Node.js (v16+)
- MongoDB Atlas account

## Quick Start


### Backend Setup
```powershell
cd backend
npm install

# Edit .env and paste your MongoDB Atlas connection string
notepad .env  # Replace MONGO_URI with your Atlas connection string

npm run dev
```

### Frontend
Open `frontend\index.html` in your browser, or serve it:
```powershell
# Option: Use Live Server extension in VS Code
# Or use a simple HTTP server:
cd frontend
npx serve
```

The frontend expects the backend at `http://localhost:5000`.

## 🚀 Deploy to Vercel

### Backend (API)
```powershell
cd backend
npm install -g vercel
vercel login
vercel

# Add environment variables in Vercel dashboard:
# MONGO_URI = your_atlas_connection_string
# JWT_SECRET = your_secret_key
```

### Frontend
```powershell
cd frontend
vercel

# Update app.js line 1 to use your deployed backend URL:
# const API = 'https://your-backend.vercel.app/api';
```

Or deploy frontend to:
- **Netlify**: Drag & drop `frontend` folder
- **GitHub Pages**: Push to repo, enable Pages in settings

## API Endpoints
- POST `/api/auth/signup` - Register new user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user (protected)
- GET `/api/tasks` - Get all tasks (protected)
- POST `/api/tasks` - Create task (protected)
- PUT `/api/tasks/:id` - Update task (protected)
- DELETE `/api/tasks/:id` - Delete task (protected)

## Testing
1. Open frontend in browser
2. Sign up with name, email, password
3. Add, edit, complete, and delete tasks
4. Logout and login to verify JWT persistence

## Troubleshooting
- **MongoDB connection error**: 
  - Check your Atlas connection string format
  - Ensure Network Access allows your IP (or 0.0.0.0/0)
  - Verify Database User credentials are correct
- **Port 5000 in use**: Change PORT in `.env`
- **CORS errors**: Backend has CORS enabled for all origins (dev only)
- **Vercel timeout**: Free tier has 10s timeout for serverless functions

## 📁 Project Structure
```
taskmanagerr/
├── backend/
│   ├── config/          # Database connection
│   ├── models/          # User & Task schemas
│   ├── routes/          # Auth & Task APIs
│   ├── middleware/      # JWT verification
│   ├── server.js        # Express server
│   ├── vercel.json      # Vercel deployment config
│   └── package.json
├── frontend/
│   ├── index.html       # Single page app
│   ├── style.css        # Responsive styles
│   └── app.js           # API integration
└── README.md
```
## Live app 
https://task-manager-tawny-five.vercel.app/

## Notes
- Uses MongoDB Atlas (cloud) - no local database needed
- JWT tokens stored in localStorage
- Vercel-ready with serverless deployment
- For production: rotate JWT_SECRET, add rate limiting, input sanitization

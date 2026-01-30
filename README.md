TaskFlow — Board-Based Task Management System

TaskFlow is a production-style board-based To-Do application that lets users organize tasks across multiple boards with secure authentication and instant progress visibility. Built with React (Vite) on the frontend, Node.js + Express on the backend, MongoDB for data, and Firebase for authentication.

<h1 align="center"><a href="https://your-live-demo.example.com">▶ Live Demo — Open in browser</a></h1>
Overview

Purpose: clean, assessment-ready full-stack project demonstrating authentication, secure APIs, user isolation, and responsive UI.

Core features: signup/login, board management (create/rename/delete), task CRUD, status filters (All/Pending/Completed), progress indicator, responsive design.

Assessment fit: follows the specified tech stack, protects secrets via .env, and emphasizes commit history, code quality, and documentation.

Demo images

Replace the placeholders below with screenshots of your running app (put images in docs/ or frontend/public/ and update paths).

![Dashboard - Empty State](docs/demo-1.png)
![Dashboard - With Tasks](docs/demo-2.png)
![Mobile View](docs/demo-3.png)

Tech stack

Frontend: React (Vite), Tailwind CSS, Firebase Client SDK, Axios

Backend: Node.js, Express.js, Mongoose (MongoDB ODM), Firebase Admin SDK

Database: MongoDB (Atlas recommended for production)

Auth: Firebase Email/Password (token verified server-side)

Version Control: Git (clean, frequent commits)

Folder structure (recommended)
/ (repo root)
├── backend/
│   ├── src/
│   │   ├── app.js               # Express app + middleware
│   │   ├── server.js            # Server start
│   │   ├── config/
│   │   │   ├── db.js            # Mongoose connection
│   │   │   └── firebase.js      # Firebase Admin init
│   │   ├── models/
│   │   │   ├── Board.js
│   │   │   └── Todo.js
│   │   ├── controllers/
│   │   │   ├── boardController.js
│   │   │   └── todoController.js
│   │   ├── routes/
│   │   │   ├── boardRoutes.js
│   │   │   └── todoRoutes.js
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   └── errorHandler.js
│   │   └── utils/
│   │       └── validators.js
│   ├── package.json
│   ├── .env.example
│   └── README.md (backend-specific if needed)
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── api/
│   │   │   └── axios.js         # axios instance + interceptors
│   │   ├── config/
│   │   │   └── firebase.js      # client SDK init
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Dashboard.jsx
│   │   └── components/
│   │       ├── Navbar.jsx
│   │       ├── BoardList.jsx
│   │       ├── TodoList.jsx
│   │       └── TaskCard.jsx
│   ├── public/
│   ├── package.json
│   ├── .env.example
│   └── tailwind.config.js
│
├── .gitignore
├── README.md
└── LICENSE (optional)

Environment files (.env.example)

backend/.env.example

PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/todo-app?retryWrites=true&w=majority
FIREBASE_SERVICE_ACCOUNT_PATH=./serviceAccountKey.json
NODE_ENV=development


frontend/.env.example

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_BASE_URL=http://localhost:5000


Important: Never commit actual .env or serviceAccountKey.json. Add these to .gitignore.

.gitignore (must include)
# Node
node_modules/
npm-debug.log*
yarn-error.log*
# Env
.env
.env.local
.env.*.local
serviceAccountKey.json
# Build
dist/
build/
# OS
.DS_Store
Thumbs.db
# Editor
.vscode/
.idea/

Running locally (quick)

Backend

cd backend
npm install
# create backend/.env using backend/.env.example
npm run dev
# server available at http://localhost:5000


Frontend

cd frontend
npm install
# create frontend/.env using frontend/.env.example
npm run dev
# app available at http://localhost:5173 (Vite default)

API summary (REST)

GET /health — health check (no auth)

Boards:

GET /api/boards — list user’s boards

POST /api/boards — create board { name }

PUT /api/boards/:id — update board { name }

DELETE /api/boards/:id — delete board + cascade delete todos

Todos:

GET /api/boards/:boardId/todos?status=completed|pending — list todos

POST /api/boards/:boardId/todos — create todo { title, description? }

PUT /api/todos/:id — update todo { title?, description?, status? }

DELETE /api/todos/:id — delete todo

Auth: All API routes (except /health) require Authorization: Bearer <firebase_id_token>; backend validates via Firebase Admin SDK and extracts uid.

Deployment (recommended)

Frontend: Vercel (automatic from GitHub)
Backend: Render / Railway / Render (Node service) with environment variables set to production values.

Deployment steps (summary):

Push to GitHub (public repo OK).

Create MongoDB Atlas cluster, allow app IPs or use VPC peering, create DB user.

Create Firebase project, enable Email/Password auth, download service account JSON for backend.

Link Render (or Railway) to GitHub repo, set backend environment variables (MONGO_URI, FIREBASE_SERVICE_ACCOUNT contents or path).

Deploy frontend to Vercel; set VITE_API_BASE_URL to your backend public URL.

Commit message guidelines

Use conventional, meaningful commits. Examples:

feat: implement firebase auth on frontend
feat: add board CRUD endpoints
fix: handle mongodb connection errors
refactor: extract axios interceptor
style: polish dashboard spacing
docs: update README and deployment notes


Aim for 15–25 commits demonstrating incremental development.

Assessment checklist (final)

 No secret files committed

 .env.example present

 All required features work locally (signup, boards, tasks)

 Protected APIs validate Firebase tokens

 Responsive UI verified on mobile and desktop

 README contains setup, API, and deployment notes

 Commit history is meaningful

Troubleshooting tips (quick)

Auth errors: verify serviceAccountKey.json path and Firebase project ID match.

Mongo errors: ensure Atlas user/password are correct; add your IP to Network Access or use 0.0.0.0/0 for testing (not for production).

CORS: backend must allow frontend origin during development.

Contact / author

Author: Vicky Singh
Project: TaskFlow — README and repo prepared for assessment.

# 📋 TaskFlow

> A modern, full-stack task management application with board-based organization and secure authentication

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge)](your-demo-url)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)

TaskFlow is a production-ready task management system that enables users to organize tasks across multiple boards with Firebase authentication, real-time progress tracking, and a responsive interface. Perfect for personal productivity or team collaboration.

**[🚀 Click here to visit the live app →](your-deployed-app-url.vercel.app)**

---

## ✨ Features

- 🔐 **Secure Authentication** - Firebase email/password authentication with JWT token verification
- 📊 **Multi-Board Organization** - Create, rename, and delete unlimited task boards
- ✅ **Complete Task Management** - Full CRUD operations with title, description, and status tracking
- 🎯 **Smart Filtering** - Filter tasks by status (All, Pending, Completed)
- 📈 **Progress Tracking** - Visual progress indicators showing task completion rates
- 📱 **Responsive Design** - Seamless experience across desktop, tablet, and mobile devices
- 🔒 **User Isolation** - Secure API endpoints with user-specific data access
- ⚡ **Fast & Modern** - Built with Vite for lightning-fast development and optimal performance

---

## 🎬 Demo

<!-- Replace with your actual screenshots -->
<div align="center">
  
### Dashboard View
![Dashboard with Tasks](https://raw.githubusercontent.com/vickysingh009/todo-app/033f2a45191a90c509c85ce36fbccfd9b44ce4ab/Screenshot%202026-01-30%20135417.png)


### Mobile Experience
![Mobile View](docs/demo-mobile.png)

### Board Management
![Board Management](docs/demo-boards.png)

</div>

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **Firebase Client SDK** - Authentication integration
- **Axios** - HTTP client with interceptors

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Firebase Admin SDK** - Server-side authentication

### DevOps & Tools
- **Git** - Version control with conventional commits
- **MongoDB Atlas** - Cloud database hosting
- **Vercel/Render** - Deployment platforms

---

## 📁 Project Structure

```
taskflow/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js                 # MongoDB connection
│   │   │   └── firebase.js           # Firebase Admin setup
│   │   ├── models/
│   │   │   ├── Board.js              # Board schema
│   │   │   └── Todo.js               # Todo schema
│   │   ├── controllers/
│   │   │   ├── boardController.js    # Board logic
│   │   │   └── todoController.js     # Todo logic
│   │   ├── routes/
│   │   │   ├── boardRoutes.js        # Board endpoints
│   │   │   └── todoRoutes.js         # Todo endpoints
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js     # JWT verification
│   │   │   └── errorHandler.js       # Error handling
│   │   ├── app.js                    # Express app
│   │   └── server.js                 # Server entry point
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js              # Axios configuration
│   │   ├── config/
│   │   │   └── firebase.js           # Firebase client config
│   │   ├── context/
│   │   │   └── AuthContext.jsx       # Auth state management
│   │   ├── pages/
│   │   │   ├── Login.jsx             # Login page
│   │   │   ├── Signup.jsx            # Signup page
│   │   │   └── Dashboard.jsx         # Main dashboard
│   │   ├── components/
│   │   │   ├── Navbar.jsx            # Navigation bar
│   │   │   ├── BoardList.jsx         # Board selector
│   │   │   ├── TodoList.jsx          # Task list
│   │   │   └── TaskCard.jsx          # Individual task
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── tailwind.config.js
│   └── package.json
│
├── docs/                              # Screenshots & documentation
├── .gitignore
├── README.md
└── LICENSE
```

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (local or Atlas) - [Setup Guide](https://www.mongodb.com/docs/manual/installation/)
- **Firebase Project** - [Create Project](https://console.firebase.google.com/)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/taskflow.git
cd taskflow
```

### 2️⃣ Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Configure `backend/.env`:**

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskflow
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/taskflow?retryWrites=true&w=majority

FIREBASE_SERVICE_ACCOUNT_PATH=./serviceAccountKey.json
NODE_ENV=development
```

**Add Firebase Service Account:**
1. Go to Firebase Console → Project Settings → Service Accounts
2. Click "Generate New Private Key"
3. Save the JSON file as `serviceAccountKey.json` in the `backend/` folder

**Start the backend server:**

```bash
npm run dev
```

✅ Backend running at `http://localhost:5000`

### 3️⃣ Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Configure `frontend/.env`:**

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_BASE_URL=http://localhost:5000
```

**Start the frontend development server:**

```bash
npm run dev
```

✅ Frontend running at `http://localhost:5173`

### 4️⃣ Access the Application

Open your browser and navigate to `http://localhost:5173`

---

## 🔌 API Reference

All API routes (except `/health`) require authentication via Firebase JWT token in the `Authorization` header:

```
Authorization: Bearer <firebase-id-token>
```

### Health Check

```http
GET /health
```

Returns server health status (no authentication required)

### Boards

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/api/boards` | Get all user boards | - |
| `POST` | `/api/boards` | Create new board | `{ "name": "string" }` |
| `PUT` | `/api/boards/:id` | Update board name | `{ "name": "string" }` |
| `DELETE` | `/api/boards/:id` | Delete board (cascade deletes todos) | - |

### Todos

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/api/boards/:boardId/todos` | Get todos for board | Query: `?status=pending\|completed` |
| `POST` | `/api/boards/:boardId/todos` | Create new todo | `{ "title": "string", "description": "string?" }` |
| `PUT` | `/api/todos/:id` | Update todo | `{ "title"?: "string", "description"?: "string", "status"?: "pending\|completed" }` |
| `DELETE` | `/api/todos/:id` | Delete todo | - |

### Example Request

```javascript
// Create a new board
const response = await axios.post('/api/boards', 
  { name: 'My New Board' },
  { headers: { Authorization: `Bearer ${firebaseToken}` } }
);
```

---

## 🌐 Deployment

### Prerequisites for Production

- MongoDB Atlas account (or production MongoDB instance)
- Firebase project with Email/Password authentication enabled
- Hosting platforms (Vercel for frontend, Render/Railway for backend)

### Backend Deployment (Render/Railway)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "feat: prepare for deployment"
   git push origin main
   ```

2. **Create MongoDB Atlas Cluster**
   - Create cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Add database user
   - Whitelist IPs (use `0.0.0.0/0` for testing, restrict in production)
   - Copy connection string

3. **Deploy to Render/Railway**
   - Connect your GitHub repository
   - Set environment variables:
     - `PORT=5000`
     - `MONGO_URI=<your-atlas-connection-string>`
     - `FIREBASE_SERVICE_ACCOUNT_PATH=./serviceAccountKey.json`
     - `NODE_ENV=production`
   - Upload `serviceAccountKey.json` as a secret file (or paste JSON content as env var)

4. **Note your backend URL** (e.g., `https://taskflow-api.onrender.com`)

### Frontend Deployment (Vercel)

1. **Deploy to Vercel**
   - Import project from GitHub at [Vercel](https://vercel.com)
   - Set root directory to `frontend`
   - Configure environment variables:
     - All `VITE_FIREBASE_*` variables
     - `VITE_API_BASE_URL=<your-backend-url>`

2. **Deploy and test**

### Post-Deployment

- Test authentication flow
- Verify CORS settings on backend
- Check all CRUD operations
- Test on mobile devices

---

## 🔒 Security & Best Practices

### Environment Variables

- ✅ Never commit `.env` files or `serviceAccountKey.json`
- ✅ Always use `.env.example` as a template
- ✅ Keep separate configs for development and production

### .gitignore Configuration

```gitignore
# Dependencies
node_modules/

# Environment files
.env
.env.local
.env.*.local
serviceAccountKey.json

# Build outputs
dist/
build/

# Logs
npm-debug.log*
yarn-error.log*

# OS files
.DS_Store
Thumbs.db

# Editor
.vscode/
.idea/
```

### Authentication Flow

1. User signs up/logs in via Firebase (frontend)
2. Firebase returns ID token
3. Frontend sends token in `Authorization` header
4. Backend verifies token using Firebase Admin SDK
5. Backend extracts `uid` and authorizes request

---

## 📝 Commit Guidelines

This project follows [Conventional Commits](https://www.conventionalcommits.org/) for clear and meaningful commit history:

```bash
feat: add board deletion confirmation modal
fix: resolve task status toggle bug
refactor: extract auth logic into custom hook
style: improve mobile responsiveness for task cards
docs: update API documentation with examples
test: add unit tests for todo controller
chore: update dependencies
```

### Example Commit Progression

```
1. feat: initialize project structure
2. feat: setup firebase authentication on frontend
3. feat: implement user signup and login pages
4. feat: create backend express server with mongodb
5. feat: add board CRUD endpoints
6. feat: implement board list component
7. feat: add todo CRUD operations
8. feat: create task filtering by status
9. feat: add progress tracking indicator
10. style: implement responsive design with tailwind
11. fix: handle mongodb connection errors gracefully
12. docs: add comprehensive README
13. feat: add deployment configurations
```

---

## 🐛 Troubleshooting

### Common Issues

**Authentication Errors**
```
Error: Firebase ID token has invalid signature
```
- ✅ Verify `serviceAccountKey.json` is in correct location
- ✅ Ensure Firebase project ID matches in both frontend and backend
- ✅ Check that Firebase Auth is enabled in Firebase Console

**MongoDB Connection Errors**
```
MongoServerError: bad auth
```
- ✅ Verify username and password in `MONGO_URI`
- ✅ Check MongoDB Atlas Network Access (IP whitelist)
- ✅ Ensure database user has proper permissions

**CORS Errors**
```
Access to XMLHttpRequest blocked by CORS policy
```
- ✅ Add frontend URL to backend CORS configuration
- ✅ Check that `VITE_API_BASE_URL` points to correct backend

**Port Already in Use**
```
Error: listen EADDRINUSE: address already in use :::5000
```
```bash
# Find and kill the process
lsof -ti:5000 | xargs kill -9
# Or use a different port in .env
```

---

## 🎯 Assessment Checklist

- ✅ No secrets committed (`.env`, `serviceAccountKey.json` in `.gitignore`)
- ✅ `.env.example` files present in both frontend and backend
- ✅ All features functional locally (signup, login, boards, tasks)
- ✅ Protected API endpoints validate Firebase tokens
- ✅ Responsive UI tested on mobile and desktop
- ✅ Comprehensive README with setup and deployment instructions
- ✅ Meaningful commit history (15-25+ commits)
- ✅ Clean code structure with proper separation of concerns
- ✅ Error handling implemented throughout application
- ✅ User data isolation enforced on backend

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Vicky Singh**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

---

## 🙏 Acknowledgments

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS](https://tailwindcss.com/)

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by Vicky Singh

</div>

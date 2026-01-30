# TaskFlow - Board-Based Task Management System

A full-stack task management application that allows users to organize tasks across multiple boards with secure authentication and real-time progress tracking. Built with React, Node.js, Express, MongoDB, and Firebase Authentication.

## Features

- **User Authentication** - Secure email/password authentication via Firebase
- **Board Management** - Create, rename, and delete task boards
- **Task CRUD Operations** - Full create, read, update, delete functionality for tasks within boards
- **Task Status Tracking** - Filter tasks by status (All / Pending / Completed)
- **Progress Indicators** - Real-time completion tracking with visual progress displays
- **Responsive UI** - Mobile-first design with optimized desktop and mobile experiences

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Firebase Client SDK
- **Backend**: Node.js, Express.js, Mongoose, Firebase Admin SDK
- **Database**: MongoDB (Atlas or Local)
- **Authentication**: Firebase Email/Password Auth

## Prerequisites

- Node.js (v14+)
- MongoDB
- Firebase Project (for Auth)

## Setup Instructions

### 1. Clone the repository
```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/todo-app
FIREBASE_SERVICE_ACCOUNT_KEY=./serviceAccountKey.json
```
*Note: You will need to place your Firebase Admin SDK service account key JSON file in `backend/` or update the path.*

Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Start the frontend:
```bash
npm run dev
```

## Environment Configuration

- `.env.example` files are provided in both `frontend/` and `backend/` directories
- Separate environment variables for frontend (Vite) and backend (Node.js)
- No secrets or credentials are committed to the repository

## API Endpoints

### Auth
- Handled via Firebase on Frontend. Backend verifies User ID Token.

### Boards
- `GET /api/boards` - Get all boards for user
- `POST /api/boards` - Create a new board
- `PUT /api/boards/:id` - Update a board
- `DELETE /api/boards/:id` - Delete a board

### Todos
- `GET /api/boards/:boardId/todos` - Get todos for a board
- `POST /api/boards/:boardId/todos` - Create a todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## Folder Structure
- `backend/` - Node.js/Express API
- `frontend/` - React Client

## Deployment

This application is designed for cloud deployment and requires:
- MongoDB Atlas connection string for production database
- Firebase project configuration with authentication enabled
- Environment variables configured in your deployment platform

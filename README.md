# Task Manager (MERN Stack)

Simple task manager with **Add**, **Edit**, **Delete**, and **Complete** features.

## Prerequisites

- Node.js (v18+)
- MongoDB running locally

## Quick Start (Recommended)

Open terminal in project folder:

```bash
npm install
npm run install-all
npm run dev
```

This starts:
- Backend → `http://localhost:5000`
- Frontend → `http://localhost:3000`

Open **http://localhost:3000** in your browser.

## Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Features

- Add tasks with title and description
- Edit tasks
- Delete tasks
- Mark tasks complete/incomplete
- Task stats (total, completed, pending)

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/tasks | Get all tasks |
| POST | /api/tasks | Create task |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |

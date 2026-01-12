# TaskFlow - Modern Task Management Application

A modern, feature-rich task management application with a sleek dark theme. Built with React, Node.js, Express, and JSON file storage.

## Features

### Core Features
- ✅ Create, edit, delete, and complete tasks
- ✅ Task priorities (High, Medium, Low) with color coding
- ✅ Categories (Work, Personal, Shopping, Health, etc.)
- ✅ Due dates with overdue indicators
- ✅ Search and filter tasks
- ✅ Sort by date, priority, or alphabetical
- ✅ Real-time task statistics dashboard
- ✅ Beautiful dark theme UI
- ✅ Responsive design (Mobile, Tablet, Desktop)
- ✅ Smooth animations and transitions

### Advanced Features
- Toast notifications for user feedback
- Confirmation modals for destructive actions
- Empty states with helpful messages
- Loading states with skeleton loaders
- Keyboard shortcuts support (ESC to close modals)
- Debounced search
- Documentation page with tech stack details
- Optimized performance with React best practices

## Tech Stack

### Frontend
- **React 18** with Hooks (useState, useEffect, useContext)
- **Tailwind CSS** for styling
- **Lucide React** for modern icons
- **Vite** for fast development and building
- **Axios** for API calls

### Backend
- **Node.js** with **Express.js**
- **JSON File Storage** (no database installation needed!)
- **REST API** architecture
- **CORS** enabled for cross-origin requests

## 📁 Project Structure

```
task-tracker/
├── backend/
│   ├── config/
│   │   └── db.js              # JSON database connection
│   ├── controllers/
│   │   └── taskController.js  # Task business logic
│   ├── middleware/
│   │   ├── errorHandler.js    # Error handling
│   │   └── validator.js       # Request validation
│   ├── models/
│   │   └── Task.js            # Task data model
│   ├── routes/
│   │   └── tasks.js           # API routes
│   ├── scripts/
│   │   └── kill-port.js       # Port management utility
│   ├── database/
│   │   └── tasks.json         # JSON database file
│   ├── server.js              # Express server
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── StatsCards.jsx
    │   │   ├── TaskInput.jsx
    │   │   ├── FilterBar.jsx
    │   │   ├── TaskList.jsx
    │   │   ├── TaskCard.jsx
    │   │   ├── EditModal.jsx
    │   │   ├── DeleteModal.jsx
    │   │   ├── Documentation.jsx
    │   │   ├── Toast.jsx
    │   │   ├── ToastContainer.jsx
    │   │   └── EmptyState.jsx
    │   ├── context/
    │   │   └── TaskContext.jsx # Global state management
    │   ├── utils/
    │   │   ├── api.js          # API utilities
    │   │   ├── constants.js    # Constants
    │   │   └── helpers.js      # Helper functions
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    └── package.json
```

## Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**

**No database installation needed!** The app uses JSON file storage.

### Installation

#### 1. Clone the repository
```bash
git clone <repository-url>
cd task-tracker
```

#### 2. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

Or install both at once:
```bash
npm run install:all
```

#### 3. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on `http://localhost:3000`

### Optional Configuration

Create `backend/.env` to change the port:
```env
PORT=5000
```

## API Endpoints

- `GET /api/tasks` - Get all tasks (query params: status, priority, category, search, sort)
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/complete` - Toggle task completion
- `GET /api/tasks/stats` - Get task statistics
- `GET /health` - Health check endpoint

### Example Request

**Create Task:**
```json
POST /api/tasks
{
  "title": "Complete project",
  "description": "Finish the task tracker app",
  "priority": "high",
  "category": "Work",
  "due_date": "2024-12-31"
}
```

## Data Storage

The application uses JSON file storage located at `backend/database/tasks.json`. The file is automatically created on first run and includes:
- Automatic backups before each save
- Atomic writes to prevent corruption
- Auto-recovery from corrupted files

## 🚀 Deployment

### Vercel Deployment

This project is ready for deployment on Vercel. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

#### Quick Deploy Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Ready for deployment"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy Frontend**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Import repository
   - Set Root Directory: `frontend`
   - Add Environment Variable: `VITE_API_URL` = `https://your-backend-url.vercel.app/api`
   - Deploy

3. **Deploy Backend**
   - Create new Vercel project
   - Set Root Directory: `backend`
   - Deploy
   - Update frontend `VITE_API_URL` with backend URL

#### Environment Variables:

**Frontend:**
- `VITE_API_URL` - Backend API URL (e.g., `https://api.example.com/api`)

**Backend:**
- `PORT` - Server port (optional, defaults to 5000)
- `NODE_ENV` - Environment (`production`)

For complete deployment guide, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## License

This project is open source and available under the MIT License.

---

**Note**: Click the document icon (📄) in the navbar to view detailed tech stack documentation.

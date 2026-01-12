# Vercel Deployment Guide

This guide will help you deploy TaskFlow to Vercel.

## Prerequisites

- A [Vercel account](https://vercel.com/signup)
- GitHub account (recommended for easy deployment)
- Node.js installed locally (for testing)

## Deployment Options

### Option 1: Deploy Frontend and Backend Separately (Recommended)

This is the recommended approach as it provides better separation and easier management.

#### Deploy Frontend

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Import Project to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your GitHub repository
   - Select the **frontend** folder as the root directory

3. **Configure Build Settings**
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Environment Variables**
   - Add `VITE_API_URL` = `https://your-backend-url.vercel.app/api`
   - (You'll set this after deploying the backend)

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Note your frontend URL (e.g., `https://taskflow.vercel.app`)

#### Deploy Backend

1. **Create a new Vercel project for backend**
   - Go to Vercel Dashboard
   - Click "Add New Project"
   - Import the same GitHub repository
   - Select the **backend** folder as the root directory

2. **Configure Build Settings**
   - **Framework Preset**: Other
   - **Root Directory**: `backend`
   - **Build Command**: (leave empty or `npm install`)
   - **Output Directory**: (leave empty)
   - **Install Command**: `npm install`

3. **Create `vercel.json` in backend folder**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "server.js"
       }
     ]
   }
   ```

4. **Update `backend/server.js` for Vercel**
   - The server should export the app for Vercel:
   ```javascript
   // At the end of server.js, add:
   export default app;
   ```

5. **Environment Variables**
   - Add `PORT` = `5000` (or leave default)
   - Add `NODE_ENV` = `production`

6. **Deploy**
   - Click "Deploy"
   - Note your backend URL (e.g., `https://taskflow-api.vercel.app`)

7. **Update Frontend Environment Variable**
   - Go back to frontend project settings
   - Update `VITE_API_URL` to your backend URL + `/api`
   - Redeploy frontend

### Option 2: Monorepo Deployment (Single Project)

1. **Push code to GitHub**

2. **Import to Vercel**
   - Import your repository
   - Use root directory

3. **Create `vercel.json` in root**
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "frontend/package.json",
         "use": "@vercel/static-build",
         "config": {
           "distDir": "dist"
         }
       },
       {
         "src": "backend/server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/api/(.*)",
         "dest": "backend/server.js"
       },
       {
         "src": "/(.*)",
         "dest": "frontend/$1"
       }
     ]
   }
   ```

4. **Update `package.json` scripts**
   - Add build script in root `package.json`:
   ```json
   {
     "scripts": {
       "build": "cd frontend && npm install && npm run build"
     }
   }
   ```

5. **Environment Variables**
   - `VITE_API_URL` = `/api` (for same-domain API)
   - `NODE_ENV` = `production`

6. **Deploy**

## Environment Variables Reference

### Frontend
- `VITE_API_URL` - Backend API URL (e.g., `https://api.example.com/api` or `/api`)

### Backend
- `PORT` - Server port (optional, defaults to 5000)
- `NODE_ENV` - Environment (`production`)

## Post-Deployment

1. **Test the deployment**
   - Visit your frontend URL
   - Test creating, editing, deleting tasks
   - Check browser console for errors

2. **Database Storage**
   - JSON files are stored in Vercel's filesystem
   - Note: Vercel serverless functions are stateless
   - For production, consider migrating to a database (MongoDB, PostgreSQL, etc.)

3. **Custom Domain** (Optional)
   - Go to project settings
   - Add your custom domain
   - Configure DNS as instructed

## Troubleshooting

### Frontend can't connect to backend
- Check `VITE_API_URL` environment variable
- Ensure backend is deployed and accessible
- Check CORS settings in backend

### Backend returns 404
- Verify routes are correctly configured in `vercel.json`
- Check that `server.js` exports the app correctly

### Build fails
- Check Node.js version (Vercel uses Node 18 by default)
- Verify all dependencies are in `package.json`
- Check build logs in Vercel dashboard

## Important Notes

⚠️ **JSON File Storage Limitation**: 
- Vercel serverless functions are stateless
- File writes may not persist between function invocations
- For production use, migrate to a proper database:
  - MongoDB Atlas (free tier available)
  - PostgreSQL (via Supabase, Railway, etc.)
  - Vercel KV (Redis)

## Next Steps

1. Set up a proper database for production
2. Add authentication if needed
3. Set up CI/CD for automatic deployments
4. Configure custom domain
5. Set up monitoring and error tracking


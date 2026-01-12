# Quick Start - Vercel Deployment

## 🚀 Fastest Way to Deploy

### Prerequisites
- GitHub account
- Vercel account ([Sign up free](https://vercel.com/signup))

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Ready for Vercel deployment"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Deploy Backend (5 minutes)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. **Configure:**
   - **Project Name**: `taskflow-api`
   - **Root Directory**: `backend` ⚠️
   - **Framework Preset**: `Other`
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)
5. Click **"Deploy"**
6. **Copy the deployment URL** (e.g., `https://taskflow-api.vercel.app`)

### Step 3: Deploy Frontend (5 minutes)

1. Click **"Add New Project"** again
2. Import the same repository
3. **Configure:**
   - **Project Name**: `taskflow`
   - **Root Directory**: `frontend` ⚠️
   - **Framework Preset**: `Vite` (auto-detected)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `dist` (auto-filled)
4. **Add Environment Variable:**
   - **Name**: `VITE_API_URL`
   - **Value**: `https://taskflow-api.vercel.app/api` (use your backend URL)
5. Click **"Deploy"**

### Step 4: Test

1. Visit your frontend URL
2. Create a task
3. Verify it works!

## ✅ That's It!

Your app is now live on Vercel!

## 📋 All Input Fields Reference

See [VERCEL_DEPLOYMENT_INPUTS.md](./VERCEL_DEPLOYMENT_INPUTS.md) for complete reference of all input fields.

## 📚 Detailed Guide

For troubleshooting and advanced configuration, see [DEPLOYMENT.md](./DEPLOYMENT.md).


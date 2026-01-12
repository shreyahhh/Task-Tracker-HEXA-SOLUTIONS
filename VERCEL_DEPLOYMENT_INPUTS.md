# Vercel Deployment - Input Fields Reference

This document lists all the input fields and values you'll need when deploying TaskFlow to Vercel.

## Frontend Deployment

### Project Settings

| Field | Value | Notes |
|-------|-------|-------|
| **Project Name** | `taskflow` or `taskflow-frontend` | Your choice |
| **Framework Preset** | `Vite` | Auto-detected |
| **Root Directory** | `frontend` | ⚠️ Important |
| **Build Command** | `npm run build` | Default for Vite |
| **Output Directory** | `dist` | Vite output |
| **Install Command** | `npm install` | Default |
| **Node.js Version** | `18.x` or `20.x` | Recommended |

### Environment Variables

| Variable Name | Value | Required | Notes |
|---------------|-------|----------|-------|
| `VITE_API_URL` | `https://your-backend-url.vercel.app/api` | ✅ Yes | Replace with your backend URL |
| `NODE_ENV` | `production` | Optional | Auto-set by Vercel |

### Example Values:
```
VITE_API_URL = https://taskflow-api.vercel.app/api
```

---

## Backend Deployment

### Project Settings

| Field | Value | Notes |
|-------|-------|-------|
| **Project Name** | `taskflow-api` or `taskflow-backend` | Your choice |
| **Framework Preset** | `Other` | Not a standard framework |
| **Root Directory** | `backend` | ⚠️ Important |
| **Build Command** | (leave empty) | No build needed |
| **Output Directory** | (leave empty) | Not applicable |
| **Install Command** | `npm install` | Default |
| **Node.js Version** | `18.x` or `20.x` | Recommended |

### Environment Variables

| Variable Name | Value | Required | Notes |
|---------------|-------|----------|-------|
| `PORT` | `5000` | Optional | Defaults to 5000 |
| `NODE_ENV` | `production` | Optional | Auto-set by Vercel |
| `VERCEL` | `1` | Auto-set | Vercel sets this automatically |

### Example Values:
```
PORT = 5000
NODE_ENV = production
```

---

## Monorepo Deployment (Alternative)

If deploying as a single project:

### Project Settings

| Field | Value | Notes |
|-------|-------|-------|
| **Project Name** | `taskflow` | Your choice |
| **Framework Preset** | `Other` | Custom setup |
| **Root Directory** | `.` (root) | Project root |
| **Build Command** | `cd frontend && npm install && npm run build` | Custom |
| **Output Directory** | `frontend/dist` | Frontend build output |
| **Install Command** | `npm install` | Root level |

### Environment Variables

| Variable Name | Value | Required | Notes |
|---------------|-------|----------|-------|
| `VITE_API_URL` | `/api` | ✅ Yes | Same domain API |
| `NODE_ENV` | `production` | Optional | Auto-set |

---

## Step-by-Step Deployment Checklist

### Frontend Deployment

- [ ] Create new Vercel project
- [ ] Connect GitHub repository
- [ ] Set **Root Directory** to `frontend`
- [ ] Verify **Build Command**: `npm run build`
- [ ] Verify **Output Directory**: `dist`
- [ ] Add environment variable: `VITE_API_URL` (leave empty for now)
- [ ] Deploy and note the URL
- [ ] Update `VITE_API_URL` after backend is deployed

### Backend Deployment

- [ ] Create new Vercel project
- [ ] Connect same GitHub repository
- [ ] Set **Root Directory** to `backend`
- [ ] Leave **Build Command** empty
- [ ] Leave **Output Directory** empty
- [ ] Add environment variable: `PORT` = `5000` (optional)
- [ ] Deploy and note the URL
- [ ] Update frontend `VITE_API_URL` with backend URL
- [ ] Redeploy frontend

---

## Quick Copy-Paste Values

### Frontend Environment Variables
```env
VITE_API_URL=https://your-backend-url.vercel.app/api
```

### Backend Environment Variables
```env
PORT=5000
NODE_ENV=production
```

---

## Important Notes

1. **Root Directory is Critical**: Make sure to set the correct root directory (`frontend` or `backend`) for each project.

2. **Environment Variables**: 
   - Frontend needs `VITE_API_URL` pointing to your backend
   - Backend doesn't need special variables (optional `PORT`)

3. **Deployment Order**:
   - Deploy backend first
   - Then deploy frontend with backend URL

4. **Custom Domain**: After deployment, you can add custom domains in project settings.

5. **JSON Storage Limitation**: 
   - Vercel serverless functions are stateless
   - File writes may not persist
   - Consider migrating to a database for production

---

## Troubleshooting

### Build Fails
- Check Node.js version (use 18.x or 20.x)
- Verify all dependencies in `package.json`
- Check build logs in Vercel dashboard

### Frontend Can't Connect to Backend
- Verify `VITE_API_URL` is set correctly
- Check backend is deployed and accessible
- Verify CORS settings in backend

### Backend Returns 404
- Check `vercel.json` configuration
- Verify routes are correct
- Check server.js exports app correctly

---

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).


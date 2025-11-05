# ⚠️ Backend Deployment Required

## Current Status

✅ **Frontend**: Successfully deployed to GitHub Pages  
❌ **Backend**: Not deployed (needs separate hosting)

## The Problem

Your frontend is live at: `https://ecogetaway.github.io/eaas/`

But when you try to login, you get a **"Network Error"** because:
- The frontend is trying to connect to: `http://localhost:5001/api`
- This URL only works on your local machine
- GitHub Pages (static hosting) cannot run a Node.js backend

## ✅ Solution: Deploy Backend Separately

GitHub Pages **only hosts static files** (HTML, CSS, JS). Your backend needs a server that can run Node.js.

### Option 1: Railway (Recommended - Free tier available)

1. Go to https://railway.app
2. Sign up with GitHub
3. New Project → Deploy from GitHub → Select `ecogetaway/eaas` → Select `eaas-backend` folder
4. Add PostgreSQL database
5. Set environment variables (see `eaas-backend/.env.example`)
6. Run migrations: `npm run migrate && npm run seed`
7. Get your backend URL (e.g., `https://eaas-backend.railway.app`)
8. Update GitHub Pages environment variables (see below)

### Option 2: Render (Free tier available)

1. Go to https://render.com
2. Sign up with GitHub
3. New Web Service → Connect GitHub → Select `ecogetaway/eaas`
4. Root Directory: `eaas-backend`
5. Build Command: `npm install`
6. Start Command: `npm start`
7. Add PostgreSQL database
8. Set environment variables
9. Get your backend URL

### Option 3: Vercel (For serverless functions)

Convert backend to serverless functions (more complex)

## 🔧 After Deploying Backend

### Step 1: Get Backend URL
Once deployed, your backend will have a URL like:
- Railway: `https://eaas-backend-production.up.railway.app`
- Render: `https://eaas-backend.onrender.com`

### Step 2: Update Frontend Environment Variables

Go to GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:

```
VITE_API_URL=https://your-backend-url.railway.app/api
VITE_WS_URL=wss://your-backend-url.railway.app
```

**Important**: Use `wss://` (secure WebSocket) for production, not `ws://`

### Step 3: Redeploy Frontend

1. Go to Actions → "Deploy Frontend to GitHub Pages"
2. Click "Run workflow"
3. Wait for deployment

### Step 4: Verify

1. Visit: https://ecogetaway.github.io/eaas/
2. Try logging in
3. Should work! ✅

## 🔍 Quick Test

To verify your backend is working:

```bash
# Test backend health endpoint
curl https://your-backend-url.railway.app/health

# Should return: {"status":"ok","timestamp":"..."}
```

## 📝 Environment Variables Needed for Backend

When deploying backend, set these:

```env
NODE_ENV=production
PORT=5001
DATABASE_URL=postgresql://... (from your database provider)
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
FRONTEND_URL=https://ecogetaway.github.io/eaas
```

## 🎯 Summary

**Current**: Frontend ✅ | Backend ❌  
**Needed**: Deploy backend to Railway/Render/etc.  
**Then**: Update frontend API URL secrets  
**Result**: Full stack working! 🚀

---

**Note**: For hackathon demos, you can run the backend locally and use it with the deployed frontend, but you'll need to update the frontend URL temporarily.


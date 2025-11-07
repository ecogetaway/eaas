# Step-by-Step Deployment Guide

This guide will help you fix the CORS error and properly deploy your EaaS application.

---

## 🔍 Understanding the Problem

**Current Situation:**
- Frontend deployed at: `https://ecogetaway.github.io`
- Frontend trying to connect to: `http://localhost:5001/api` ❌ (This won't work!)
- Backend CORS only allows: `http://localhost:5173` ❌ (Missing production URL)

**What Needs to Happen:**
- Frontend needs to connect to your deployed backend URL ✅
- Backend needs to allow requests from `https://ecogetaway.github.io` ✅

---

## 📋 Prerequisites

Before starting, make sure you have:
1. ✅ Backend deployed somewhere (Railway, Render, Heroku, etc.)
2. ✅ Frontend code pushed to GitHub
3. ✅ Access to your backend deployment platform's dashboard
4. ✅ Your backend URL (e.g., `https://eaas-backend.railway.app`)

---

## 🚀 Step-by-Step Solution

### **PART 1: Fix Backend CORS Configuration**

#### Step 1.1: Verify Backend Changes
The backend code has already been updated to support CORS. Verify the changes:

```bash
cd eaas-backend
# Check that src/server.js has the new CORS configuration
grep -A 5 "allowedOrigins" src/server.js
```

You should see:
```
const allowedOrigins = [
  'http://localhost:5173',
  'https://ecogetaway.github.io',
  ...
```

#### Step 1.2: Commit and Push Backend Changes
```bash
cd eaas-backend
git add .
git commit -m "Fix CORS configuration for production frontend"
git push origin main  # or your branch name
```

#### Step 1.3: Set Environment Variable in Backend Platform

**If using Railway:**
1. Go to https://railway.app
2. Select your backend project
3. Click on your service
4. Go to "Variables" tab
5. Click "New Variable"
6. Add:
   - **Name:** `FRONTEND_URL`
   - **Value:** `https://ecogetaway.github.io`
7. Click "Add"
8. Railway will automatically redeploy

**If using Render:**
1. Go to https://render.com
2. Select your backend service
3. Go to "Environment" tab
4. Click "Add Environment Variable"
5. Add:
   - **Key:** `FRONTEND_URL`
   - **Value:** `https://ecogetaway.github.io`
6. Click "Save Changes"
7. Render will automatically redeploy

**If using Heroku:**
```bash
heroku config:set FRONTEND_URL=https://ecogetaway.github.io -a your-app-name
```

**If using other platforms:**
Find the "Environment Variables" or "Config" section and add the same variable.

#### Step 1.4: Verify Backend Deployment
Wait for deployment to complete (usually 1-2 minutes), then test:

```bash
# Test backend is accessible
curl https://your-backend-url.railway.app/health

# Should return: {"status":"ok","timestamp":"..."}
```

---

### **PART 2: Fix Frontend Configuration**

#### Step 2.1: Get Your Backend URL
Note down your backend URL. It should look like:
- Railway: `https://eaas-backend.railway.app`
- Render: `https://eaas-backend.onrender.com`
- Heroku: `https://your-app.herokuapp.com`

#### Step 2.2: Update Frontend Environment Variables (For GitHub Actions)

Since you're deploying to GitHub Pages, you need to update your GitHub Actions workflow:

**Step 2.2a: Find or Create GitHub Actions Workflow**

Go to your GitHub repo → `.github/workflows/` folder (or create it)

Create or edit `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]  # Change to your branch name

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: eaas-frontend/package-lock.json
      
      - name: Install dependencies
        working-directory: ./eaas-frontend
        run: npm ci
      
      - name: Build
        working-directory: ./eaas-frontend
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}
          VITE_WS_URL: ${{ secrets.VITE_WS_URL }}
        run: npm run build
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './eaas-frontend/dist'
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Step 2.2b: Add GitHub Secrets**

1. Go to your GitHub repository
2. Click **Settings** (top menu)
3. Click **Secrets and variables** → **Actions** (left sidebar)
4. Click **New repository secret**
5. Add first secret:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://YOUR-BACKEND-URL/api`
     - Replace `YOUR-BACKEND-URL` with your actual backend URL
     - Example: `https://eaas-backend.railway.app/api`
   - Click **Add secret**
6. Add second secret:
   - **Name:** `VITE_WS_URL`
   - **Value:** `wss://YOUR-BACKEND-URL`
     - Replace `YOUR-BACKEND-URL` with your actual backend URL
     - Use `wss://` (WebSocket Secure) for HTTPS backends
     - Example: `wss://eaas-backend.railway.app`
   - Click **Add secret**

#### Step 2.3: Alternative - Manual Build and Deploy

If you prefer to build manually and push the `dist` folder:

**Step 2.3a: Build Locally with Environment Variables**
```bash
cd eaas-frontend

# Set environment variables
export VITE_API_URL=https://your-backend-url.railway.app/api
export VITE_WS_URL=wss://your-backend-url.railway.app

# Build
npm run build

# Verify build was successful
ls -la dist/
```

**Step 2.3b: Commit and Push Built Files**
```bash
cd eaas-frontend

# Add dist folder (if not in .gitignore)
git add dist/

# Commit
git commit -m "Build frontend with production API URLs"

# Push
git push origin main
```

**Note:** Make sure `dist/` is NOT in `.gitignore` if using this method.

---

### **PART 3: Enable GitHub Pages**

#### Step 3.1: Configure GitHub Pages
1. Go to your GitHub repository
2. Click **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select:
   - **Deploy from a branch** → **main** (or your branch)
   - **Folder:** `/ (root)` or `/eaas-frontend/dist` (depending on your structure)
5. Click **Save**

#### Step 3.2: Wait for Deployment
- GitHub Pages usually takes 1-2 minutes to deploy
- You'll see a green checkmark when it's ready
- Your site will be available at: `https://ecogetaway.github.io`

---

### **PART 4: Verify Everything Works**

#### Step 4.1: Test Backend CORS
```bash
# Test from command line (replace with your URLs)
curl -H "Origin: https://ecogetaway.github.io" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://your-backend-url/api/auth/login

# Should return headers with Access-Control-Allow-Origin
```

#### Step 4.2: Test Frontend Connection
1. Open `https://ecogetaway.github.io` in your browser
2. Open Developer Tools (F12 or Cmd+Option+I)
3. Go to **Network** tab
4. Try to login
5. Check the network requests:
   - ✅ Should see requests to `https://your-backend-url/api/auth/login`
   - ✅ Should NOT see `localhost` anywhere
   - ✅ Status should be 200 (success) or 401 (auth required), NOT CORS error

#### Step 4.3: Check Browser Console
Look for:
- ✅ No CORS errors
- ✅ No "Network Error" messages
- ✅ API requests showing correct backend URL

---

## 🐛 Troubleshooting

### Problem: Still seeing CORS errors

**Check:**
1. Backend `FRONTEND_URL` environment variable is set correctly
2. Backend has been redeployed after adding the variable
3. Frontend was built with correct environment variables

**Verify backend CORS:**
```bash
curl -v -H "Origin: https://ecogetaway.github.io" \
     https://your-backend-url/api/health
```

Look for: `Access-Control-Allow-Origin: https://ecogetaway.github.io`

### Problem: Frontend still connecting to localhost

**Fix:**
1. Check GitHub Secrets are set correctly
2. Re-run GitHub Actions workflow
3. Or rebuild frontend locally with correct env vars

### Problem: Backend not accessible

**Check:**
1. Backend URL is correct (no typos)
2. Backend is actually running (check deployment logs)
3. Backend health endpoint works: `/health`

---

## 📝 Quick Reference

### Backend Environment Variables
```bash
FRONTEND_URL=https://ecogetaway.github.io
```

### Frontend Environment Variables (GitHub Secrets)
```bash
VITE_API_URL=https://your-backend-url.railway.app/api
VITE_WS_URL=wss://your-backend-url.railway.app
```

### URLs to Remember
- **Frontend:** `https://ecogetaway.github.io`
- **Backend:** `https://your-backend-url.railway.app` (your actual URL)

---

## ✅ Success Checklist

- [ ] Backend code updated with CORS fix
- [ ] Backend `FRONTEND_URL` environment variable set
- [ ] Backend redeployed and accessible
- [ ] Frontend GitHub Secrets configured
- [ ] Frontend rebuilt with correct API URLs
- [ ] GitHub Pages enabled and deployed
- [ ] No CORS errors in browser console
- [ ] Login works on production site

---

## 🆘 Need Help?

If you're stuck:
1. Check browser console for specific error messages
2. Check backend deployment logs
3. Verify all environment variables are set correctly
4. Ensure both frontend and backend are using HTTPS in production


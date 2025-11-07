# 🚂 Complete Railway Deployment Guide

This guide will help you deploy your backend to Railway and connect it to your GitHub Pages frontend.

---

## 📋 Prerequisites Checklist

- [x] Railway account (hobby plan)
- [ ] Backend code ready
- [ ] PostgreSQL database (Railway provides one)
- [ ] Redis (optional, but recommended)

---

## 🚀 Part 1: Deploy Backend to Railway

### Step 1.1: Prepare Backend Code

First, let's make sure everything is ready locally:

```bash
cd eaas-backend

# Check package.json exists
cat package.json

# Verify server.js exists
ls src/server.js
```

### Step 1.2: Commit and Push Backend Code

```bash
cd eaas-backend

# Add all changes
git add .

# Check what will be committed
git status

# Commit
git commit -m "Configure for Railway deployment - CORS and environment setup"

# Push to your GitHub repository
git push origin main  # or master, depending on your branch
```

### Step 1.3: Connect to Railway

1. **Go to Railway**
   - Visit: https://railway.app
   - Sign in (or create account if needed)

2. **Create New Project**
   - Click **"New Project"** (top right)
   - Select **"Deploy from GitHub repo"**
   - Select your repository
   - Select the `eaas-backend` folder/directory

3. **Railway will automatically detect Node.js**
   - It should recognize this is a Node.js project
   - It may ask you to select the root directory
   - Select `eaas-backend` if prompted

### Step 1.4: Add PostgreSQL Database

Railway needs a database for your app:

1. **In your Railway project**, click **"+ New"**
2. **Select "Database"** → **"Add PostgreSQL"**
3. Railway will create a Postgres database
4. **Note the database name/connection details** (you'll need this)

### Step 1.5: Configure Environment Variables

In Railway project dashboard:

1. **Click on your backend service** (not the database)
2. **Click "Variables" tab**
3. **Add these environment variables:**

```bash
# Required Variables
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://ecogetaway.github.io

# Database (Railway auto-generates DATABASE_URL, but verify it's there)
# DATABASE_URL should be automatically set by Railway from your PostgreSQL service

# JWT Secret (generate a secure random string)
JWT_SECRET=your_super_secret_jwt_key_$(openssl rand -hex 32)

# Redis (optional - add if you have a Redis service)
REDIS_URL=redis://your-redis-url

# Other settings
JWT_EXPIRE=7d
UPLOAD_DIR=./uploads
```

**To generate JWT_SECRET:**
```bash
# Run this locally and copy the output
openssl rand -hex 32
```

**Quick way to add variables in Railway:**
- Click "+ New Variable" for each one
- Railway will automatically deploy when you save

### Step 1.6: Link PostgreSQL to Backend

Railway should auto-link, but verify:

1. In your backend service, check **"Variables"** tab
2. Look for `DATABASE_URL` - it should be there automatically
3. If not, click **"Reference Variable"** and select the database

### Step 1.7: Add Redis (Optional but Recommended)

1. **Click "+ New"** in your project
2. **Select "Database"** → **"Add Redis"**
3. Railway will create Redis service
4. **Reference it** in your backend service variables as `REDIS_URL`

### Step 1.8: Configure Build Settings

Railway usually auto-detects, but verify:

1. **Click on your backend service**
2. **Go to "Settings" tab**
3. **Check:**
   - **Root Directory:** `eaas-backend` (if in subfolder) or blank if root
   - **Build Command:** (usually auto-detected, can leave blank for npm install)
   - **Start Command:** `npm start` (check your package.json scripts)

### Step 1.9: Wait for Deployment

- Railway will automatically:
  1. Install dependencies (`npm install`)
  2. Build your project (if needed)
  3. Start your server (`npm start`)

- **Watch the "Deployments" tab** to see progress
- Wait for **"Build Succeeded"** and **"Deploy Succeeded"**

### Step 1.10: Get Your Backend URL

1. **Click on your backend service**
2. **Go to "Settings" tab**
3. **Scroll to "Networking"** section
4. **Click "Generate Domain"** (if not already generated)
5. **Copy the URL** - it will look like:
   - `https://eaas-backend-production.up.railway.app`
   - or `https://eaas-backend.railway.app`

6. **Test your backend:**
   ```bash
   # Replace with your actual URL
   curl https://your-backend-url.railway.app/health
   
   # Should return: {"status":"ok","timestamp":"..."}
   ```

---

## 🗄️ Part 2: Set Up Database

### Step 2.1: Connect to Railway Database Locally

You need to run migrations:

**Option A: Use Railway CLI (Recommended)**

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Run migrations
cd eaas-backend
railway run npm run migrate

# Seed database
railway run npm run seed
```

**Option B: Use Direct Connection**

1. In Railway, click on your **PostgreSQL** service
2. Go to **"Variables"** tab
3. Copy the `DATABASE_URL` value
4. Use it locally:

```bash
cd eaas-backend

# Set DATABASE_URL temporarily
export DATABASE_URL="postgresql://user:password@host:port/database"

# Run migrations
npm run migrate

# Seed database
npm run seed
```

**Option C: Use Railway's Database URL**

If Railway provides a connection string, you can use it with `psql`:

```bash
# In Railway dashboard, find PostgreSQL connection string
# Then connect and run SQL manually, or use:
railway connect postgres
# Then run the migration SQL
```

---

## 🔗 Part 3: Connect Frontend to Backend

### Step 3.1: Get Your Backend URL

You should have this from Step 1.10. It looks like:
- `https://eaas-backend.railway.app`
- or `https://eaas-backend-production.up.railway.app`

### Step 3.2: Add GitHub Secrets

1. **Go to your GitHub repository**
   - Navigate to: `https://github.com/your-username/your-repo`

2. **Click "Settings"** (top menu)

3. **Go to Secrets**
   - Click **"Secrets and variables"** → **"Actions"**

4. **Add Secret #1:**
   - Click **"New repository secret"**
   - **Name:** `VITE_API_URL`
   - **Value:** `https://your-backend-url.railway.app/api`
     - Replace `your-backend-url.railway.app` with your actual Railway URL
   - Click **"Add secret"**

5. **Add Secret #2:**
   - Click **"New repository secret"** again
   - **Name:** `VITE_WS_URL`
   - **Value:** `wss://your-backend-url.railway.app`
     - Replace with your actual URL
     - Use `wss://` (WebSocket Secure)
   - Click **"Add secret"**

### Step 3.3: Create GitHub Actions Workflow

Create `.github/workflows/deploy.yml` in your repository root:

```yaml
name: Deploy Frontend to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
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
          VITE_WS_URL, ${{ secrets.VITE_WS_URL }}
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

**If your frontend is NOT in a subfolder:**
Change `working-directory: ./eaas-frontend` to remove it, and `path: './eaas-frontend/dist'` to `./dist`

### Step 3.4: Commit and Push Workflow

```bash
cd /Users/sanjay/eaas

# Create workflow directory
mkdir -p .github/workflows

# The workflow file should be created above
# Then commit and push:
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions workflow for Pages deployment"
git push origin main
```

### Step 3.5: Enable GitHub Pages

1. Go to repository **Settings** → **Pages**
2. Under **"Source"**, select:
   - **"GitHub Actions"** (not "Deploy from a branch")
3. Go to **"Actions"** tab - the workflow should run automatically
4. Wait for deployment to complete (~2-3 minutes)

---

## ✅ Part 4: Verify Everything Works

### Step 4.1: Test Backend

```bash
# Replace with your Railway URL
curl https://your-backend-url.railway.app/health

# Should return JSON with status "ok"
```

### Step 4.2: Test Backend CORS

```bash
curl -H "Origin: https://ecogetaway.github.io" \
     -H "Access-Control-Request-Method: POST" \
     -X OPTIONS \
     https://your-backend-url.railway.app/api/auth/login -v

# Look for: Access-Control-Allow-Origin: https://ecogetaway.github.io
```

### Step 4.3: Test Frontend

1. Visit: `https://ecogetaway.github.io`
2. Open browser console (F12)
3. Go to **Network** tab
4. Try logging in
5. Check:
   - ✅ Requests go to your Railway backend URL
   - ✅ No CORS errors
   - ✅ Requests succeed (200 or 401, not errors)

---

## 🐛 Troubleshooting

### Problem: Railway build fails

**Check:**
- Node.js version in `package.json` (should be compatible)
- All dependencies are in `package.json`
- Build command is correct

**Fix:**
- Add to Railway **Variables:**
  - `NODE_VERSION=18` (or your version)

### Problem: Database connection fails

**Check:**
- `DATABASE_URL` is set in Railway variables
- PostgreSQL service is running
- Migration script works locally

**Fix:**
```bash
# Test database connection
railway connect postgres
# Then run: \dt  to see tables
```

### Problem: Frontend still shows localhost

**Check:**
- GitHub Secrets are set correctly
- GitHub Actions workflow ran successfully
- Check Actions logs to see if secrets were used

**Fix:**
- Re-run the workflow manually
- Double-check secret names match exactly

---

## 📋 Complete Checklist

- [ ] Backend code pushed to GitHub
- [ ] Railway project created
- [ ] PostgreSQL database added
- [ ] Environment variables configured in Railway
- [ ] Railway deployment successful
- [ ] Database migrations run
- [ ] Backend URL obtained from Railway
- [ ] GitHub Secrets configured (`VITE_API_URL` and `VITE_WS_URL`)
- [ ] GitHub Actions workflow created
- [ ] GitHub Pages enabled
- [ ] Frontend deployment successful
- [ ] Test: Login works on production site! 🎉

---

## 💡 Railway Tips

1. **Hobby Plan Limits:**
   - 500 hours/month free
   - $5/month for extra usage
   - Check usage in Railway dashboard

2. **Sleep Mode:**
   - Free tier services sleep after inactivity
   - First request after sleep takes ~10-30 seconds
   - Consider upgrading for always-on

3. **Monitoring:**
   - Check Railway dashboard for logs
   - View deployment history
   - Monitor resource usage

4. **Custom Domain:**
   - Railway allows custom domains even on hobby plan
   - Better for production

---

## 🎉 Success!

Once all steps are complete, your app should be fully deployed and working!

**Your URLs:**
- Frontend: `https://ecogetaway.github.io`
- Backend: `https://your-backend-url.railway.app`


# 🎯 Next Steps - Quick Action Checklist

## ✅ Step 1: Commit and Push Backend Changes

Your backend code is ready, but needs to be committed:

```bash
cd eaas-backend

# Add all changes
git add .

# Commit
git commit -m "Fix CORS configuration for production frontend"

# Push to your repository
git push origin main  # or 'master' if that's your branch
```

**What this does:** Pushes the updated CORS code to your repo, which your deployment platform (Railway/Render) will automatically deploy.

---

## ✅ Step 2: Set Environment Variable in Your Deployment Platform

Your backend needs to know about your frontend URL. Choose your platform:

### **If using Railway:**
1. Go to https://railway.app
2. Click on your backend project
3. Click on your service
4. Click **"Variables"** tab (or "Environment" tab)
5. Click **"+ New Variable"**
6. Add:
   - **Name:** `FRONTEND_URL`
   - **Value:** `https://ecogetaway.github.io`
7. Click **"Add"**
8. Railway will auto-redeploy (wait ~1-2 minutes)

### **If using Render:**
1. Go to https://render.com
2. Click on your backend service
3. Go to **"Environment"** tab
4. Click **"Add Environment Variable"**
5. Add:
   - **Key:** `FRONTEND_URL`
   - **Value:** `https://ecogetaway.github.io`
6. Click **"Save Changes"**
7. Render will auto-redeploy (wait ~1-2 minutes)

### **If using Heroku:**
```bash
heroku config:set FRONTEND_URL=https://ecogetaway.github.io -a your-app-name
```

---

## ✅ Step 3: Get Your Backend URL

You'll need this for the frontend configuration. Your backend URL should look like:
- Railway: `https://eaas-backend.railway.app` or `https://eaas-backend-production.up.railway.app`
- Render: `https://eaas-backend.onrender.com`
- Heroku: `https://your-app.herokuapp.com`

**Find it:** Check your deployment platform dashboard - it's usually displayed on the main service page.

**Test it:** Visit `https://your-backend-url/health` - should return `{"status":"ok",...}`

---

## ✅ Step 4: Configure Frontend GitHub Secrets

Your frontend needs to know where your backend is:

1. **Go to your GitHub repository**
   - Navigate to: `https://github.com/ecogetaway/YOUR-REPO-NAME`

2. **Open Settings**
   - Click **"Settings"** tab (top menu)

3. **Go to Secrets**
   - Click **"Secrets and variables"** → **"Actions"** (left sidebar)

4. **Add Secret #1:**
   - Click **"New repository secret"**
   - **Name:** `VITE_API_URL`
   - **Value:** `https://YOUR-BACKEND-URL/api`
     - Replace `YOUR-BACKEND-URL` with your actual backend URL
     - Example: `https://eaas-backend.railway.app/api`
   - Click **"Add secret"**

5. **Add Secret #2:**
   - Click **"New repository secret"** again
   - **Name:** `VITE_WS_URL`
   - **Value:** `wss://YOUR-BACKEND-URL`
     - Replace `YOUR-BACKEND-URL` with your actual backend URL
     - Use `wss://` (WebSocket Secure) - note the double 's'
     - Example: `wss://eaas-backend.railway.app`
   - Click **"Add secret"**

---

## ✅ Step 5: Update GitHub Actions Workflow

Create or update `.github/workflows/deploy.yml` in your repository:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]  # Change if your branch is different

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
        uses: actions/deploy-pages@v4
```

**If your frontend is in the root** (not in `eaas-frontend/` folder), change:
- `working-directory: ./eaas-frontend` → remove this line
- `cache-dependency-path: eaas-frontend/package-lock.json` → `package-lock.json`
- `path: './eaas-frontend/dist'` → `./dist`

---

## ✅ Step 6: Enable GitHub Pages

1. Go to repository **Settings** → **Pages**
2. Under **"Source"**, select:
   - **"Deploy from a branch"**
   - **Branch:** `main` (or your branch)
   - **Folder:** `/eaas-frontend/dist` (or `/dist` if frontend is in root)
3. Click **"Save"**

---

## ✅ Step 7: Test

After all steps complete (usually 2-3 minutes):

1. **Visit your frontend:** `https://ecogetaway.github.io`
2. **Open browser console:** Press F12 or Cmd+Option+I
3. **Go to Network tab**
4. **Try to login**
5. **Check:**
   - ✅ Requests go to your backend URL (not localhost)
   - ✅ No CORS errors
   - ✅ Login works

---

## 🐛 Troubleshooting

**Still see CORS errors?**
- Verify backend `FRONTEND_URL` is set correctly
- Check backend deployment logs
- Test backend CORS: `curl -H "Origin: https://ecogetaway.github.io" https://your-backend-url/api/health`

**Frontend still using localhost?**
- Verify GitHub Secrets are set
- Check GitHub Actions workflow ran successfully
- Verify build used the secrets (check Actions logs)

**Backend not accessible?**
- Check backend is running (look at deployment logs)
- Verify backend URL is correct
- Test: `curl https://your-backend-url/health`

---

## 📝 Current Status Checklist

Check off as you complete:

- [ ] Backend code committed and pushed
- [ ] Backend `FRONTEND_URL` environment variable set
- [ ] Backend redeployed and accessible
- [ ] Backend URL noted down
- [ ] Frontend GitHub Secrets configured (`VITE_API_URL` and `VITE_WS_URL`)
- [ ] GitHub Actions workflow created/updated
- [ ] GitHub Pages enabled
- [ ] Frontend redeployed
- [ ] Tested login - works! 🎉


# ✅ Railway + GitHub Pages Deployment Checklist

Follow these steps in order. Check each box as you complete it.

---

## 🚀 BACKEND DEPLOYMENT (Railway)

### Step 1: Prepare Code
- [ ] Commit backend changes
  ```bash
  cd eaas-backend
  git add .
  git commit -m "Configure for Railway deployment"
  git push origin main
  ```

### Step 2: Deploy to Railway
- [ ] Go to https://railway.app and login
- [ ] Click **"New Project"**
- [ ] Select **"Deploy from GitHub repo"**
- [ ] Choose your repository
- [ ] Select **`eaas-backend`** folder when prompted
- [ ] Railway starts deploying automatically

### Step 3: Add Database
- [ ] In Railway project, click **"+ New"**
- [ ] Click **"Database"** → **"Add PostgreSQL"**
- [ ] Railway creates it automatically
- [ ] Verify `DATABASE_URL` appears in backend Variables (should be automatic)

### Step 4: Set Environment Variables
Click on your backend service → **Variables** tab → Add these:

- [ ] `NODE_ENV` = `production`
- [ ] `PORT` = `5000`
- [ ] `FRONTEND_URL` = `https://ecogetaway.github.io`
- [ ] `JWT_SECRET` = (generate with: `openssl rand -hex 32`)
- [ ] `JWT_EXPIRE` = `7d`

**Note:** `DATABASE_URL` is automatically set by Railway - don't add it manually!

### Step 5: Wait for Deployment
- [ ] Watch "Deployments" tab
- [ ] Wait for green checkmark ✅
- [ ] Deployment successful!

### Step 6: Get Backend URL
- [ ] Click backend service → **Settings** tab
- [ ] Scroll to **"Networking"**
- [ ] Click **"Generate Domain"** (if needed)
- [ ] Copy the URL (e.g., `https://eaas-backend.railway.app`)

### Step 7: Set Up Database
- [ ] Install Railway CLI: `npm install -g @railway/cli`
- [ ] Login: `railway login`
- [ ] Link project: `cd eaas-backend && railway link`
- [ ] Run migrations: `railway run npm run migrate`
- [ ] Seed database: `railway run npm run seed`

### Step 8: Test Backend
- [ ] Test health endpoint:
  ```bash
  curl https://your-backend-url.railway.app/health
  ```
- [ ] Should return: `{"status":"ok",...}`
- [ ] Test CORS:
  ```bash
  curl -H "Origin: https://ecogetaway.github.io" \
       https://your-backend-url.railway.app/api/health
  ```

---

## 🎨 FRONTEND DEPLOYMENT (GitHub Pages)

### Step 9: Configure GitHub Secrets
Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions**

- [ ] Add `VITE_API_URL` = `https://your-backend-url.railway.app/api`
  - Replace `your-backend-url.railway.app` with your actual Railway URL
- [ ] Add `VITE_WS_URL` = `wss://your-backend-url.railway.app`
  - Same URL, but with `wss://` prefix

### Step 10: Enable GitHub Pages
- [ ] Go to repo **Settings** → **Pages**
- [ ] Under **"Source"**, select **"GitHub Actions"**
- [ ] Workflow runs automatically (check **Actions** tab)
- [ ] Wait 2-3 minutes for deployment

### Step 11: Verify Frontend
- [ ] Visit: `https://ecogetaway.github.io`
- [ ] Open browser console (F12)
- [ ] Go to **Network** tab
- [ ] Try logging in
- [ ] ✅ Verify requests go to Railway URL (not localhost)
- [ ] ✅ No CORS errors
- [ ] ✅ Login works!

---

## 🎉 DEPLOYMENT COMPLETE!

**Your URLs:**
- Frontend: `https://ecogetaway.github.io`
- Backend: `https://your-backend-url.railway.app`

---

## 🐛 Troubleshooting

**Railway deployment fails?**
- Check deployment logs in Railway
- Verify `package.json` has correct `start` script
- Check Node.js version compatibility

**Database connection fails?**
- Verify PostgreSQL service is running
- Check `DATABASE_URL` exists in Variables
- Run migrations using Railway CLI

**Frontend shows localhost?**
- Verify GitHub Secrets are set correctly
- Check GitHub Actions workflow logs
- Re-run workflow manually

**CORS errors?**
- Verify `FRONTEND_URL` is set in Railway
- Redeploy backend after setting variable

---

## 📚 Detailed Guides

- **Complete Railway Guide:** `RAILWAY-DEPLOYMENT-GUIDE.md`
- **Quick Start:** `QUICK-START-RAILWAY.md`
- **Step-by-Step:** `STEP-BY-STEP-DEPLOYMENT.md`


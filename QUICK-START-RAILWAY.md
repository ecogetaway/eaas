# ⚡ Quick Start: Deploy to Railway

## 🎯 What We're Doing

1. Deploy backend to Railway (5 minutes)
2. Set up database (2 minutes)
3. Configure frontend (3 minutes)
4. Connect them together (2 minutes)

**Total time: ~12 minutes**

---

## 📝 Step-by-Step

### **STEP 1: Push Backend Code (1 minute)**

```bash
cd eaas-backend
git add .
git commit -m "Configure for Railway deployment"
git push origin main
```

### **STEP 2: Deploy to Railway (5 minutes)**

1. **Go to Railway:** https://railway.app
2. **Login** (or sign up if needed)
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose your repository**
6. **Select `eaas-backend` folder** when prompted

Railway will start deploying automatically!

### **STEP 3: Add PostgreSQL Database (1 minute)**

1. In your Railway project, click **"+ New"**
2. Click **"Database"** → **"Add PostgreSQL"**
3. Railway creates it automatically
4. Railway automatically links it to your backend (as `DATABASE_URL`)

### **STEP 4: Set Environment Variables (2 minutes)**

1. **Click on your backend service** (the one that's deploying)
2. **Click "Variables" tab**
3. **Click "+ New Variable"** and add these:

| Name | Value |
|------|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `FRONTEND_URL` | `https://ecogetaway.github.io` |
| `JWT_SECRET` | `generate-random-string-here` |
| `JWT_EXPIRE` | `7d` |

**To generate JWT_SECRET:**
```bash
# Run this in terminal:
openssl rand -hex 32
# Copy the output and paste as JWT_SECRET value
```

**Note:** `DATABASE_URL` is automatically set by Railway - you don't need to add it manually!

### **STEP 5: Wait for Deployment (2 minutes)**

- Watch the "Deployments" tab
- Wait for green checkmark ✅
- Deployment is done!

### **STEP 6: Get Your Backend URL (30 seconds)**

1. Click on your backend service
2. Click **"Settings"** tab
3. Scroll to **"Networking"**
4. Click **"Generate Domain"** (if needed)
5. **Copy the URL** - looks like: `https://eaas-backend.railway.app`

### **STEP 7: Set Up Database (2 minutes)**

**Option A: Using Railway CLI (Easiest)**

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to your project (this will open Railway in browser)
cd eaas-backend
railway link
# Select your project and service when prompted

# Run migrations
railway run npm run migrate

# Seed database
railway run npm run seed
```

**Option B: Manual Connection**

1. In Railway, click PostgreSQL service
2. Go to "Connect" or "Variables" tab
3. Copy the connection string
4. Export it locally:
   ```bash
   export DATABASE_URL="postgresql://..."
   cd eaas-backend
   npm run migrate
   npm run seed
   ```

### **STEP 8: Configure Frontend GitHub Secrets (2 minutes)**

1. **Go to GitHub:** https://github.com/your-username/your-repo
2. **Settings** → **Secrets and variables** → **Actions**
3. **Add Secret #1:**
   - Name: `VITE_API_URL`
   - Value: `https://your-backend-url.railway.app/api`
     - Replace `your-backend-url.railway.app` with your actual Railway URL
4. **Add Secret #2:**
   - Name: `VITE_WS_URL`
   - Value: `wss://your-backend-url.railway.app`
     - Same URL, but with `wss://` instead of `https://`

### **STEP 9: Enable GitHub Pages (1 minute)**

1. Go to repo **Settings** → **Pages**
2. Under **"Source"**, select **"GitHub Actions"**
3. The workflow will run automatically (check **Actions** tab)
4. Wait 2-3 minutes for deployment

### **STEP 10: Test! (1 minute)**

1. Visit: `https://ecogetaway.github.io`
2. Open browser console (F12)
3. Try logging in
4. Check Network tab - should see requests to your Railway URL ✅

---

## ✅ Verification Checklist

Before testing, verify:

- [ ] Railway backend is deployed (green checkmark)
- [ ] Backend URL copied from Railway
- [ ] Environment variables set in Railway
- [ ] Database migrations run successfully
- [ ] GitHub Secrets configured
- [ ] GitHub Actions workflow ran successfully
- [ ] GitHub Pages deployed

---

## 🐛 Common Issues

**"Backend not responding"**
- Check Railway deployment logs
- Verify PORT is set to 5000
- Check DATABASE_URL is automatically linked

**"Database connection failed"**
- Verify PostgreSQL service is running in Railway
- Run migrations using Railway CLI
- Check DATABASE_URL variable exists

**"Frontend still shows localhost"**
- Verify GitHub Secrets are set correctly
- Check GitHub Actions logs to see if secrets were used
- Re-run the workflow manually

**"CORS errors"**
- Verify `FRONTEND_URL` is set to `https://ecogetaway.github.io` in Railway
- Redeploy backend after setting variable

---

## 🎉 Success!

Once all steps are complete:
- ✅ Backend: `https://your-backend-url.railway.app`
- ✅ Frontend: `https://ecogetaway.github.io`
- ✅ They're connected and working!

---

## 💰 Railway Hobby Plan Info

- **500 hours/month free** (about 16 hours/day)
- **$5/month** if you exceed
- Services sleep after inactivity (first request takes ~10-30 seconds)
- Perfect for hackathons and demos!

---

## 📞 Need Help?

1. Check Railway deployment logs
2. Check GitHub Actions logs
3. Verify all environment variables are set
4. Test backend URL: `curl https://your-url/health`

